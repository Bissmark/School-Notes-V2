import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as categoriesServices from "../utilities/categories-service";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { IconContext } from 'react-icons';
import { CiTimer } from "react-icons/ci";
import { MdOutlinePriorityHigh } from "react-icons/md";
import './CategoryForm.css'

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
        <div className="test">
            <form onSubmit={_handleSubmit} className="category-form">
                <h1>Add Category</h1>
                <IconContext.Provider value={{ color: "white", size: "2.5em" }}>
                <div className="name-field">
                    <MdDriveFileRenameOutline />
                    <input type="text" name="name" value={newCategory.name}  onChange={_handleChange} required placeholder="Name..."/>
                </div>
                </IconContext.Provider>
                <IconContext.Provider value={{ color: "white", size: "1.5em" }}>
                <label className="time-field">
                    <CiTimer />
                    <select name="time" onChange={_handleChange } value={newCategory.time}>
                        {times.map((time, index) => (
                            <option key={index} value={time}>{time}</option>
                        ))}
                    </select>
                </label>
                </IconContext.Provider>
                <IconContext.Provider value={{ color: "white", size: "1.5em", style: { height: '2em'}}}>
                <label className="priority-field">
                    <MdOutlinePriorityHigh />
                    <select name="priority" onChange={_handleChange } value={newCategory.priority}>
                        {priorities.map((priority, index) => (
                            <option key={index} value={priority}>{priority}</option>
                        ))}
                    </select>
                </label>
                </IconContext.Provider>
                <button>Add Category</button>
            </form>
        </div>
    )
}

export default CategoryForm;