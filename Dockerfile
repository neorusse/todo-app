# FROM node:10-alpine as builder

# # install and cache app dependencies
# COPY package.json package-lock.json ./
# RUN npm install && mkdir /react-frontend && mv ./node_modules ./react-frontend

# WORKDIR /react-frontend

# COPY . .

# RUN npm run build

# # ------------------------------------------------------
# # Production Build
# # ------------------------------------------------------
# FROM nginx:1.16.0-alpine
# COPY --from=builder /react-frontend/build /usr/share/nginx/html
# RUN rm /etc/nginx/conf.d/default.conf
# COPY nginx/nginx.conf /etc/nginx/conf.d
# EXPOSE 80
# # Containers run nginx with global directives and daemon off
# CMD ["nginx", "-g", "daemon off;"]


# Build environment
FROM node:12-alpine as builder
USER node
RUN mkdir /home/node/app
WORKDIR /home/node/app
COPY --chown=node:node package*.json ./
RUN npm ci
COPY --chown=node:node . .
RUN npm run build

# Production environment
FROM nginx:1.16.0-alpine
COPY --from=builder /home/node/app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
