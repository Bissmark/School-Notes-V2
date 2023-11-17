import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import * as tasksServices from '../utilities/tasks-service';
import * as categoriesServices from '../utilities/categories-service';
import { IconContext } from 'react-icons';
import { MdDriveFileRenameOutline } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { MdOutlineDescription } from "react-icons/md";
import { GoImage } from "react-icons/go";
import './TasksForm.css';

export default function TaskForm ({tasks, setTasks, categories, uploadImage, setCategories, closeTaskForm }) {
    const [newTask, setNewTask] = useState({
        name: '',
        description: '',
        time: '',
        priority: '',
        date: '',
        image: ''
    });
    const initialCategoryId = categories.length > 0 ? categories[0]._id : '';
    const [selectedCategoryId, setSelectedCategoryId] = useState(initialCategoryId);
    const [isLoading, setIsLoading] = useState(categories.length === 0); // Set loading state initially

    const navigate = useNavigate();
    const [image, setImage] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesRender = await categoriesServices.getCategories(); // Adjust the function call based on your actual data fetching logic
                setCategories(categoriesRender);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        };

        if (categories.length === 0) {
            // Fetch categories only if they are not already present
            fetchCategories();
        } else {
            setIsLoading(false);
        }
    }, [categories, setCategories]);

    // useEffect(() => {
    //     const fetchTasks = async () => {
    //         try {
    //             const tasksRender = await tasksServices.getTasks();
    //             setTasks(tasksRender);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     fetchTasks();
    // }, [setTasks]);

    async function addTaskToCategory(categoryId, task) {
        try {
            const addedTask = await tasksServices.addTaskToCategory(categoryId, task);
            // Use functional updates to ensure synchronous state updates
            setTasks([...tasks, addedTask]);
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
            closeTaskForm();
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="task-form">
            <form onSubmit={ _handleSubmit }>
                <h1 style={{color: 'white'}}>Add Task</h1>
                {isLoading ? (
                    <p>Loading categories...</p>
                    ) : (
                <IconContext.Provider value={{ color: "white", size: "2.5em" }}>
                <div className="name-field-tasks">
                    <MdDriveFileRenameOutline />
                    <input type="text" name="name" value={newTask.name}  onChange={_handleChange} required placeholder="Name..." />
                </div>
                
                <div className="description-field">
                    <MdOutlineDescription />
                    <input type="text" name="description" value={newTask.description}  onChange={_handleChange} required placeholder="Description..." />
                </div>
                <div className="category-field">
                    <BiCategory />
                    <select name="category" onChange={_handleCategoryChange}>
                        {categories.map((category, index) => (
                            <option key={index} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                    <div className="image-field">
                        <GoImage />
                        <input type="file" id="files" className="hidden" onChange={_handleImageChange} />
                        <label htmlFor="files">Select File</label>
                    </div>
                </IconContext.Provider>
                )}
                <button style={{marginBottom: '2em', width: '100%'}}>Add Task</button>
            </form>
        </div>
    );
}