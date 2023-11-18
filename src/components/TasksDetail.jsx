import { useParams, useNavigate, Link } from "react-router-dom"
import { useState, useEffect } from "react";
import * as tasksServices from '../utilities/tasks-service';
import * as categoriesServices from '../utilities/categories-service';
import EditForm from './EditForm';
import './TasksDetail.css';

const TasksDetail = ({ tasks, setTasks, categories, setCategories, uploadImage }) => {
    const [singleTask, setSingleTask] = useState({
        name: '',
        category: '',
        description: '',
        createdAt: '',
        image: ''
    });
    const [loading, setLoading] = useState(true);
    const [showEditForm, setShowEditForm] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
    const fetchTaskDetails = async () => {
        setLoading(true);
        try {
            // Fetch categories first
            const categoriesData = await categoriesServices.getCategories();
            setCategories(categoriesData);

            // Fetch task details
            const task = await tasksServices.getTaskDetails(id);
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
}, [id, setCategories]);

    async function deleteTask(id) {
        await tasksServices.deleteTask(id);
        const updatedtasks = tasks.filter((n) => n._id !== id);
        setTasks(updatedtasks);
        navigate('/');
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
                        tasks={tasks}
                        categories={categories}
                        setCategories={setCategories}
                        setTasks={setTasks}
                        setSingleTask={setSingleTask}
                        closeEditForm={closeEditForm}
                        uploadImage={uploadImage}
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
                            <li>Date Created: <p>{new Date(singleTask.createdAt).toLocaleString()}</p></li>
                            <button className='button-delete' onClick={() => deleteTask(singleTask._id)}>
                        Delete
                    </button>
                    <button className='category-button' onClick={toggleEditForm}>Edit</button>
                        </ul>
                            <img src={singleTask.image} alt="" />
                    </div>
                </>
            )}
        </div>
        </div>
    );
}

export default TasksDetail;