import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as tasksServices from '../utilities/tasks-service';

const EditForm = ({ tasks, priorities, times, categories, uploadImage }) => {
    let { id } = useParams();
    const task = tasks.find((n) => n._id === id);
    const [editedTask, setEditedTask] = useState(task);
    const [image, setImage] = useState('');
    const navigate = useNavigate();

    async function updateTask(task) {
        const editedTask = await tasksServices.updateTask(task);
        setEditedTask(editedTask);
    }

    function _handleChange(e) {
        setEditedTask({
            ...editedTask,
            [e.target.name]: e.target.value
        })
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
            console.log(error);
        }
        updateTask(editedTask);
        navigate(`/tasks/${task._id}`);
    }
    return (
        <div>
            <h1>Edit Form</h1>
            <form onSubmit={ _handleSubmit }>
                <label>
                    Task Name: <input type="text" name="name" value={editedTask.name}  onChange={_handleChange} required />
                </label>
                <label>
                    Task Description: <input type="text" name="description" value={editedTask.description}  onChange={_handleChange} required />
                </label>
                <label>
                    Task Category:
                    <select name="category" value={editedTask.category} onChange={_handleChange }>
                        {categories.map((category, index) => (
                            <option key={index} value={category.name}>{category.name}</option>
                        ))}
                    </select>    
                </label>
                
                {/* <select name="time" value={editedTask.time} onChange={_handleChange }>
                    {times.map((time, index) => (
                        <option key={index} value={time}>{time}</option>
                    ))}
                </select>
                <select name="priority" value={editedTask.priority} onChange={_handleChange }>
                    {priorities.map((priority, index) => (
                        <option key={index} value={priority}>{priority}</option>
                    ))}
                </select> */}
                <label>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])} />    
                </label>
                
                <button>Update</button>
            </form>
        </div>
    )
}

export default EditForm;