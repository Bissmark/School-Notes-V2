import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const apiUrl = process.env.NODE_ENV === 'production'
    ? 'https://school-notes-backend.onrender.com'
    : 'http://localhost:5000';

const CategoryDetail = () => {
    const [category, setCategory] = useState({});
    const [tasks, setTasks] = useState([]);
    const { id } = useParams();

    const getCategory = async () => {
        try {
            const response = await fetch(`http://${apiUrl}/categories/${id}`).then((res) => res.json());
            //const categoryData = await response.json();
            setCategory(response);
            setTasks(response.tasks);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCategory();
    }, [id]);


    const { name } = category;
    return (
        <div>
            <h2>Category: {name}</h2>
            <h3>Tasks:</h3>
            <ul>
                {tasks.map((task) => {
                    return <li key={task.id}>{task.name}</li>;
                })}
            </ul>
        </div>
    )
}

export default CategoryDetail;