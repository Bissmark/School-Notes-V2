import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import * as categoriesServices from '../utilities/categories-service';
import TasksDetail from "./TasksDetail";
import './TasksIndexInsideCategory.css';

const TasksIndexInsideCategory = ({ categories, setCategories }) => {
    const { id } = useParams();
    const category = categories.find((category) => category._id === id);
    const tasksInCategory = category ? category.tasks : [];

    const updateTasks = async () => {
        try {
        const updatedCategoriesData = await categoriesServices.getCategories();
        setCategories(updatedCategoriesData);
        } catch (error) {
        console.error('Error updating tasks:', error);
        }
    };

    return (
        <>
            <h1>Tasks in { category ? category.name : 'Category'}</h1>
            <div className='grid-for-tasks'>
                {tasksInCategory.length > 0 ? (
                    <ul className="tasks-list">
                        {tasksInCategory.map((task) => (
                            <li key={task._id}>
                                <TasksDetail
                                    taskId={task._id}  // Pass the task ID instead of the entire task
                                    categoryId={category._id}
                                    categories={categories}
                                    updateTasks={updateTasks}
                                />
                            </li>                   
                        ))}
                    </ul>    
                ) : (
                    <p>No tasks yet!</p>
                )}
            </div>
        </>
    )
}

export default TasksIndexInsideCategory;