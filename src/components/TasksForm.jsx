import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import * as tasksServices from '../utilities/tasks-service';
import './TasksForm.css';

export default function TaskForm ({tasks, setTasks, categories, uploadImage, setCategories }) {
    const [newTask, setNewTask] = useState({
        name: '',
        description: '',
        time: '',
        priority: '',
        date: '',
        image: ''
    });
    const [selectedCategoryId, setSelectedCategoryId] = useState(categories[0]._id);

    const navigate = useNavigate();
    const [image, setImage] = useState('');

    async function addTaskToCategory(categoryId, task) {
        try {
            const addedTask = await tasksServices.addTaskToCategory(categoryId, task);
            // Use functional updates to ensure synchronous state updates
            setTasks((prevTasks) => [...prevTasks, addedTask]);
            setCategories((prevCategories) => {
                return prevCategories.map((category) => {
                    if (category._id === categoryId) {
                        category.tasks.push(addedTask);
                    }
                    return category;
                });
            });
            return addedTask; // Return the added task
        } catch (error) {
            console.log(error);
        }
    }

    const _handleChange = (e) => {
        setNewTask((prevTask) => ({
            ...prevTask, 
            [e.target.name]: e.target.value
        }));
    }

    const _handleImageChange = (e) => {
        setImage(e.target.files[0])
    }

    const _handleCategoryChange = (e) => {
        setSelectedCategoryId(e.target.value);
        setNewTask({...newTask, [e.target.name]: e.target.value});
    }
    
    const _handleSubmit = async (e) => {
        e.preventDefault();
        if (image) {
            const data = await uploadImage(image);
            newTask.image = data.url;
        } else {
            setImage('');
        }
        try {
            addTaskToCategory(selectedCategoryId, newTask);
            setNewTask({name: '', description: '', time: '', priority: '', date: '', image: ''});
            setImage('');
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="task-form">
            <h1>Add Task</h1>
            <form onSubmit={ _handleSubmit }>
                <label>
                    Name: <input type="text" name="name" value={newTask.name}  onChange={_handleChange} required />
                </label>
                <label>
                    Description: <input type="text" name="description" value={newTask.description}  onChange={_handleChange} required />
                </label>
                <label>
                    Category: 
                    <select name="category" onChange={_handleCategoryChange }>
                    {categories.map((category, index) => (
                        <option key={index} value={category._id}>{category.name}</option>
                    ))}
                </select>
                </label>
                
                {/* <select name="time" onChange={_handleChange }>
                    {times.map((time, index) => (
                        <option key={index} value={time} defaultValue={time}>{time}</option>
                    ))}
                </select>
                <select name="priority" onChange={_handleChange }>
                    {priorities.map((priority, index) => (
                        <option key={index} value={priority}>{priority}</option>
                    ))}
                </select> */}
                <label>
                    Image: <input type="file" onChange={_handleImageChange} />
                </label>
                <button>Add Task</button>
            </form>
        </div>
    );
}