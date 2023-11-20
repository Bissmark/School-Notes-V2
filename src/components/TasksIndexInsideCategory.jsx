import { useParams, Link } from "react-router-dom";
import TasksDetail from "./TasksDetail";
import './TasksIndexInsideCategory.css';

const TasksIndexInsideCategory = ({ categories, tasks, setTasks, setCategories, uploadImage }) => {
    const { id } = useParams();
    const category = categories.find((category) => category._id === id);
    const tasksInCategory = category ? category.tasks : [];

    return (
        <div>
            <h1>Tasks in { category ? category.name : 'Category'}</h1>
            {tasksInCategory.length > 0 ? (
                <ul className="tasks-list">
                    {tasksInCategory.map((task) => (
                        <li key={task._id}>
                            <TasksDetail
                                taskId={task._id}  // Pass the task ID instead of the entire task
                                categoryId={category._id}
                                categories={categories}
                            />
                        </li>                   
                    ))}
                </ul>    
            ) : (
                <p>No tasks yet!</p>
            )}
        </div>
    )
}

export default TasksIndexInsideCategory;