import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import * as tasksServices from '../utilities/tasks-service';
import { IconContext } from 'react-icons';
import { MdDriveFileRenameOutline } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { MdOutlineDescription } from "react-icons/md";
import { GoImage } from "react-icons/go";
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
                <div className="name-field">
                    <MdDriveFileRenameOutline />
                    <input type="text" name="name" value={newTask.name}  onChange={_handleChange} required placeholder="Name..." />
                </div>
                <div className="description-field">
                    <MdOutlineDescription />
                    <input type="text" name="description" value={newTask.description}  onChange={_handleChange} required placeholder="Description..." />
                </div>
                <IconContext.Provider value={{ color: "white", size: "1.5em" }}>
                <div className="category-field">
                    <BiCategory />
                    <select name="category" onChange={_handleCategoryChange }>
                        {categories.map((category, index) => (
                            <option key={index} value={category._id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                </IconContext.Provider>
                <IconContext.Provider value={{ color: "white", size: "1.5em" }}>
                    <div className="image-field">
                        <GoImage />
                        <input type="file" onChange={_handleImageChange} />
                    </div>
                </IconContext.Provider>
                <button>Add Task</button>
            </form>
        </div>
    );
}