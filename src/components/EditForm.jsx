import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as tasksServices from '../utilities/tasks-service';
import { IconContext } from 'react-icons';
import { MdDriveFileRenameOutline } from "react-icons/md";
import { MdOutlineDescription } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { GoImage } from "react-icons/go";
import './EditForm.css';

const EditForm = ({ categories, uploadImage, closeEditForm, setSingleTask, singleTaskId }) => {
    let { id } = useParams();
    const [editedTask, setEditedTask] = useState(null); // Set initial state to null
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categoryWithTask, setCategoryWithTask] = useState(null); // Set initial state to null
    
    async function updateTask(id, task) {
        try {
            //const taskId = task._id;
            const editedTaskResult = await tasksServices.updateTask(id, task);
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
            setLoading(true);
            try {
                const taskSingular = await tasksServices.getTaskDetails(id);

                // Find the category that contains the task with the matching ID
                const category = categoryWithTask || categories.find(category =>
                    category.tasks.some(taskItem => taskItem._id === singleTaskId)
                );

                if (category) {
                    // Set the editedTask with the category name
                    const specificTask = category.tasks.find(task => task._id === singleTaskId);
                    setEditedTask({
                        ...taskSingular,
                        name: specificTask.name,
                        description: specificTask.description,
                        category: category ? category.name : ''
                    });
                    setCategoryWithTask(category);
                } else {
                    setError(new Error("Category not found"));
                }
            } catch (error) {
                setError(error);
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchTask();
    }, [singleTaskId, categories, categoryWithTask]);

    function _handleChange(e) {
        setEditedTask({
            ...editedTask,
            [e.target.name]: e.target.value
        });
    }

    async function _handleSubmit(e) {
    e.preventDefault();
    try {
        let updatedTask = { ...editedTask };

        if (image) {
            const data = await uploadImage();
            updatedTask.image = data.url;
        } else {
            setImage('');
        }

        // Pass the task ID and updated task data to updateTask
        await updateTask(singleTaskId, updatedTask);

        setSingleTask(updatedTask);  // Use updatedTask instead of editedTask
        closeEditForm();
        setEditedTask(null);
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
                <div className="name-field-tasks-edit">
                    <MdDriveFileRenameOutline />
                    <input type="text" name="name" value={editedTask.name}  onChange={_handleChange} required />
                </div>
                <div className="description-field-edit">
                    <MdOutlineDescription />
                    <input type="text" name="description" value={editedTask.description}  onChange={_handleChange} required />
                </div>
                <div className="category-field-edit">
                    <BiCategory />
                    <select name="category" value={editedTask.category} onChange={_handleChange }>
                        {categories.map((category, index) => (
                            <option key={index} value={category.name}>{category.name}</option>
                        ))}
                    </select>    
                </div>
                <div className="image-field-edit">
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