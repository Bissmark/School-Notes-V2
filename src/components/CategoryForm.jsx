import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as categoriesServices from "../utilities/categories-service";

const CategoryForm = ({ categories, setCategories, times, priorities}) => {
    const [newCategory, setNewCategory] = useState({
        name: '',
        time: 'Slow',
        priority: 'Low',
    });
    const navigate = useNavigate();

    async function addCategory(category) {
        const newCategory = await categoriesServices.createCategory(category);
        setCategories([...categories, newCategory]);
    }

    const _handleChange = (e) => {
        setNewCategory({
            ...newCategory,
            [e.target.name]: e.target.value,
        });
    }

    function _handleSubmit(e) {
        e.preventDefault();
        addCategory(newCategory);
        setNewCategory({name: '', time: 'Slow', priority: 'Low'});
        navigate('/')
    }

    return (
        <div>
            <h1>Add Category</h1>
            <form onSubmit={_handleSubmit}>
                <label>
                    Name: <input type="text" name="name" value={newCategory.name}  onChange={_handleChange} required />
                </label>
                <label>
                    Time: 
                    <select name="time" onChange={_handleChange } value={newCategory.time}>
                    {times.map((time, index) => (
                        <option key={index} value={time}>{time}</option>
                    ))}
                </select>
                </label>
                <label>
                    Priority: 
                    <select name="priority" onChange={_handleChange } value={newCategory.priority}>
                    {priorities.map((priority, index) => (
                        <option key={index} value={priority}>{priority}</option>
                    ))}
                    </select>
                </label>
                <button>Add Category</button>
            </form>
        </div>
    )
}

export default CategoryForm;