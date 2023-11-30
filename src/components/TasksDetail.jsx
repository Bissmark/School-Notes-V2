import { useNavigate, Link } from "react-router-dom"
import { useState, useEffect } from "react";
import * as tasksServices from '../utilities/tasks-service';
import * as categoriesServices from '../utilities/categories-service';
import EditForm from './EditForm';
import './TasksDetail.css';

const TasksDetail = ({ taskId, categories, categoryId, updateTasks }) => {
    const [singleTask, setSingleTask] = useState({
        name: '',
        category: '',
        description: '',
        createdAt: '',
        image: ''
    });
    const [loading, setLoading] = useState(true);
    const [showEditForm, setShowEditForm] = useState(false);
    const navigate = useNavigate();

     useEffect(() => {
        const fetchTaskDetails = async () => {
            setLoading(true);
            try {
                // Fetch categories first
                const categoriesData = await categoriesServices.getCategories();

                // Fetch task details based on taskId
                const task = await tasksServices.getTaskDetails(taskId);
                const taskCategory = categoriesData.find((category) => category.tasks.some((taskItem) => taskItem._id === task._id));
                const taskWithCategory = { ...task, category: taskCategory ? taskCategory.name : '' };
                setSingleTask(taskWithCategory);
            } catch (error) {
                console.error('Error fetching task details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTaskDetails();
    }, [taskId]);

    async function deleteTask(id) {
        await tasksServices.deleteTask(id);
        updateTasks();
        navigate(`/categories/${categoryId}/tasks`);
    }

    const toggleEditForm = () => {
        setShowEditForm((prev) => !prev);
    };

    const closeEditForm = () => {
        setShowEditForm(false);
    };

    return (
        <div className="edit-page-grid">
            {showEditForm && ( // Conditionally render CategoryForm
                <div className="category-form-container-edit">
                    <EditForm
                        categories={categories}
                        setSingleTask={setSingleTask}
                        closeEditForm={closeEditForm}
                        singleTaskId={singleTask._id}
                    />
                </div>
            )}
        <div key={singleTask._id} className="task-background">
            {loading ? (
                <div className="loading">
                    <div className="loading-spinner"></div>
                    <p>loading...</p>
                </div>
            ) : (
                <>
                
                    <h1>{singleTask.name}</h1>
                    <div className="details-page">
                        <ul className="ul-tasks">
                            <li>Task Description: <p>{singleTask.description}</p></li>
                            <li>Task Category: <p>{singleTask.category}</p></li>
                            <li style={{marginBottom: '2em'}}>Date Created: <p>{new Date(singleTask.createdAt).toLocaleString()}</p></li>
                            <img src={singleTask.image} alt="" />
                        </ul>
                    </div>
                            <button className='button-delete' onClick={() => deleteTask(singleTask._id)}>Delete</button>
                            <button className='category-button' onClick={toggleEditForm}>Edit</button>
                </>
            )}
        </div>
        </div>
    );
}

export default TasksDetail;