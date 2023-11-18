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

const EditForm = ({ tasks, categories, uploadImage, closeEditForm, setTasks, setSingleTask }) => {
    let { id } = useParams();
    const [editedTask, setEditedTask] = useState(null); // Set initial state to null
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    async function updateTask(task) {
        try {
            const editedTaskResult = await tasksServices.updateTask(task);
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
                const taskSingular = await tasksServices.getTaskDetails(id);
                // const taskCategory = categoriesData.find((category) => category.tasks.some((taskItem) => taskItem._id === task._id));
                // const taskWithCategory = { ...task, category: taskCategory ? taskCategory.name : '' };
                setEditedTask(taskSingular);
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
                console.log(editedTask);
                editedTask.image = data.url;
            } else {
                setImage('');
                console.log(editedTask);
            }
            setImage('');
            setSingleTask(editedTask);
            console.log(editedTask)
            updateTask(editedTask);
            closeEditForm();
        } catch (error) {
            setError(error);
            console.log(error);
        }
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