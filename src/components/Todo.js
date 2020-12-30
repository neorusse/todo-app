import React, { useState, useEffect } from 'react';
import './Todo.css';

function Task({ task, index, completeTask, removeTask }) {
	return (
		<div
			className="task"
			style={{ textDecoration: task.completed ? 'line-through' : '' }}
		>
			{task.title}
			<button style={{ background: 'red' }} onClick={() => removeTask(index)}>
				x
			</button>
			<button onClick={() => completeTask(index)}>Complete</button>
		</div>
	);
}

function CreateTask({ addTask }) {
	const [value, setValue] = useState('');

	const handleSubmit = e => {
		e.preventDefault();
		if (!value) return;

		// passing value to Parent Component's (Todo) addTask function
		addTask(value);
		setValue('');
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				className="input"
				value={value}
				placeholder="Add a new task"
				onChange={e => setValue(e.target.value)}
			/>
		</form>
	);
}

function Todo() {
	// Hook registed for the pending tasks
	const [tasksRemaining, setTasksRemaining] = useState(0);
	// Hook registed for tasks
	const [tasks, setTasks] = useState([
		{
			title: 'Vist AccessBank HQ',
			completed: true
		},
		{
			title: 'Explore Marina Bay',
			completed: true
		},
		{
			title: 'Try Uber Boat Ride',
			completed: false
		}
	]);

	useEffect(() => {
		setTasksRemaining(tasks.filter(task => !task.completed).length);
	}, [tasks]);

	// cb func passed as a prop to CreateTask Component
	// inorder to receive its parameter from child component
	const addTask = title => {
		const newTasks = [...tasks, { title, completed: false }];
		setTasks(newTasks);
	};

	// cb func passed as a prop to Task Component
	// inorder to receive its parameter from child component
	const completeTask = index => {
		const newTasks = [...tasks];
		newTasks[index].completed = true;
		setTasks(newTasks);
	};

	const removeTask = index => {
		const newTasks = [...tasks];
		newTasks.splice(index, 1);
		setTasks(newTasks);
	};

	return (
		<div className="todo-container">
			<div className="header">Pending tasks ({tasksRemaining})</div>

			<div className="tasks">
				{tasks.map((task, index) => (
					<Task
						task={task}
						index={index}
						completeTask={completeTask}
						removeTask={removeTask}
						key={index}
					/>
				))}
			</div>

			<div className="create-task">
				<CreateTask addTask={addTask} />
			</div>
		</div>
	);
}

export default Todo;
