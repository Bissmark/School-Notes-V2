import { useParams, useNavigate, Link } from "react-router-dom"
import { useState, useEffect } from "react";
import * as tasksServices from '../utilities/tasks-service';
import './TasksDetail.css';

const TasksDetail = ({ tasks, setTasks }) => {
    const [singleTask, setSingleTask] = useState({
        name: '',
        category: '',
        description: '',
        createdAt: '',
        image: ''
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        tasksServices.getTaskDetails(id).then((task) => {
            setSingleTask(task);
        });
    }, [id]); // Make sure to include id in the dependency array to re-fetch data when id changes

    async function deleteTask(id) {
        await tasksServices.deleteTask(id);
        const updatedtasks = tasks.filter((n) => n._id !== id);
        setTasks(updatedtasks);
        navigate('/');
    }

    return (
        <div key={singleTask._id} className="task-background">
            <h1>{singleTask.name}</h1>
            <div className="details-page">
                <ul className="ul-tasks">
                    <li>Task Description: <p>{singleTask.description}</p></li>
                    <li>Task Category: <p>{singleTask.category}</p></li>
                    <li>Date Created: <p>{new Date(singleTask.createdAt).toLocaleString()}</p></li>
                    <button className='button-delete' onClick={() => deleteTask(singleTask._id)}>
                Delete
            </button>
            <Link className="edit-button" to={`/tasks/${singleTask._id}/edit`}>
                Edit
            </Link>
                </ul>
                    <img src={singleTask.image} alt="" />
            </div>
            
        </div>
    );
}

export default TasksDetail;