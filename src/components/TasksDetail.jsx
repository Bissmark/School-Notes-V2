import { useParams, useNavigate, Link } from "react-router-dom"
import { useState, useEffect } from "react";
import * as tasksServices from '../utilities/tasks-service';
import './TasksDetail.css';

const TasksDetail = ({ tasks, setTasks }) => {
    const [singleTask, setSingleTask] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        tasksServices.getTaskDetails(id).then((task) => {
            setSingleTask(task);
        });
    }, []);

    async function deleteTask(id) {
        await tasksServices.deleteTask(id);
        const updatedtasks = tasks.filter((n) => n._id !== id);
        setTasks(updatedtasks);
        navigate('/');
    }

    return (
        <div key={singleTask._id} className="task-background">
                <h1>{ singleTask.name }</h1>
            <ul>
                <li>Task Category: <p>{ singleTask.category }</p></li>
                <li>Task Description: <p>{ singleTask.description }</p></li>
                {/* <li>{ singleTask.time }</li>
                <li>{ singleTask.priority }</li> */}
                <li>Date Created: <p>{ new Date(singleTask.createdAt).toLocaleString() }</p></li>
                <img src={singleTask.image} alt="" />
            </ul>
            <button className='button-delete' onClick={ () => deleteTask(singleTask._id) }>
                Delete
            </button>
            <button className="edit-button">
                <Link to={`/tasks/${singleTask._id}/edit`}>Edit</Link>
            </button>
        </div>
    )
}

export default TasksDetail