import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as categoriesServices from "../utilities/categories-service";
import { IconContext } from 'react-icons';
import { MdDriveFileRenameOutline } from "react-icons/md";
import { CiTimer } from "react-icons/ci";
import { MdOutlinePriorityHigh } from "react-icons/md";
import './CategoryForm.css'

const CategoryForm = ({ categories, setCategories, times, priorities, closeCategoryForm}) => {
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
        closeCategoryForm();
        navigate('/')
    }
    return (
        <div className="category-form">
            <form onSubmit={_handleSubmit}>
                <h1 style={{color: 'white'}}>Add Category</h1>
                <IconContext.Provider value={{ color: "white", size: "2.5em" }}>
                <div className="name-field">
                    <MdDriveFileRenameOutline />
                    <input type="text" name="name" value={newCategory.name}  onChange={_handleChange} required placeholder="Name..."/>
                </div>
                <div className="time-field">
                    <CiTimer />
                    <select name="time" onChange={_handleChange } value={newCategory.time}>
                        {times.map((time, index) => (
                            <option key={index} value={time}>{time}</option>
                        ))}
                    </select>
                </div>
                <div className="priority-field">
                    <MdOutlinePriorityHigh />
                    <select name="priority" onChange={_handleChange } value={newCategory.priority}>
                        {priorities.map((priority, index) => (
                            <option key={index} value={priority}>{priority}</option>
                        ))}
                    </select>
                </div>
                </IconContext.Provider>
                <button style={{marginBottom: '2em', width: '100%'}}>Add Category</button>
            </form>
        </div>
    )
}

export default CategoryForm;