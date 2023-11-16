import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as tasksServices from '../utilities/tasks-service';
import * as categoriesServices from '../utilities/categories-service';
import { IconContext } from 'react-icons';
import { MdDriveFileRenameOutline } from "react-icons/md";
import { MdOutlineDescription } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { GoImage } from "react-icons/go";
import './EditForm.css';

const EditForm = ({ tasks, categories, uploadImage }) => {
    let { id } = useParams();
    const [editedTask, setEditedTask] = useState(null); // Set initial state to null
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    console.log(tasks);

    async function updateTask(task) {
        try {
            const editedTaskResult = await tasksServices.updateTask(task);
            console.log(editedTaskResult);
            setEditedTask(editedTaskResult);
        } catch (error) {
            setError(error);
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
    const fetchTask = async () => {
        try {
            const task = tasks.find((n) => n._id === id);
            if (task) {
                // Fetch associated tasks for the category
                const categoryTasks = await categoriesServices.getCategories();
                
                task.tasks = categoryTasks;
            }
            setEditedTask(task || { name: '', description: '', category: '', time: '', priority: '', date: '', image: '' });
        } catch (error) {
            setError(error);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    fetchTask();
}, [tasks, categories, id]);

    function _handleChange(e) {
        setEditedTask({
            ...editedTask,
            [e.target.name]: e.target.value
        });
    }

    async function _handleSubmit(e) {
        e.preventDefault();
        try {
            if (image) {
                const data = await uploadImage();
                editedTask.image = data.url;
            } else {
                setImage('');
            }
            setImage('');
        } catch (error) {
            setError(error);
            console.log(error);
        }
        updateTask(editedTask);
        navigate(`/tasks/${id}`);
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div className="edit-form">
            <form onSubmit={ _handleSubmit }>
                <h1>Edit Form</h1>
                <IconContext.Provider value={{ color: "white", size: "2.5em" }}>
                <div className="name-field-tasks">
                    <MdDriveFileRenameOutline />
                    <input type="text" name="name" value={editedTask.name}  onChange={_handleChange} required />
                </div>
                <div className="description-field">
                    <MdOutlineDescription />
                    <input type="text" name="description" value={editedTask.description}  onChange={_handleChange} required />
                </div>
                <div className="category-field">
                    <BiCategory />
                    <select name="category" value={editedTask.category} onChange={_handleChange }>
                        {categories.map((category, index) => (
                            <option key={index} value={category.name}>{category.name}</option>
                        ))}
                    </select>    
                </div>
                <div className="image-field">
                        <GoImage />
                        <input type="file" id="files" className="hidden" onChange={(e) => setImage(e.target.files[0])} />
                        <label htmlFor="files">Select File</label>
                </div>
                </IconContext.Provider>
                <button>Update</button>
            </form>
        </div>
    )
}

export default EditForm;