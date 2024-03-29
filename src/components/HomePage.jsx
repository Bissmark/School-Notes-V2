import { useEffect, useRef, useState } from 'react';
import { Link} from 'react-router-dom';
import TasksList from './TasksList';
import * as categoriesServices from '../utilities/categories-service';
import Draggable from 'react-draggable';
import CategoryForm from './CategoryForm';
import TasksForm from './TasksForm';
import { IoIosArrowRoundForward } from "react-icons/io";
import './HomePage.css';

export default function HomePage({ setCategories, categories, searchQuery, times, priorities, uploadImage }) {
    const [loading, setLoading] = useState(true);
    const [showCategoryForm, setShowCategoryForm] = useState(false);
    const [showTaskForm, setShowTaskForm] = useState(false);

    const quadrant1 = categories.filter((category) => category.time === 'Slow' && category.priority === 'Low');
    const quadrant2 = categories.filter((category) => category.time === 'Fast' && category.priority === 'Low');
    const quadrant3 = categories.filter((category) => category.time === 'Slow' && category.priority === 'High');
    const quadrant4 = categories.filter((category) => category.time === 'Fast' && category.priority === 'High');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesRender = await categoriesServices.getCategories();
                setCategories(categoriesRender);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories()
    }, [setCategories]);

    async function saveCategoryPositions() {
        try {
            for (let category of categories) {
                const { _id } = category;
                await categoriesServices.saveCategoryPositions(_id, category);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleDragStop = async (category, newPosition) => {
        try {
            category.position = newPosition;
            setCategories([...categories]);
        } catch (error) {
            console.log(error);
        }
        saveCategoryPositions();
    };


    async function deleteCategory(category) {
        try {
            await categoriesServices.deleteCategory(category);
            setCategories((prevCategories) => prevCategories.filter((n) => 
                n._id !== category._id
            ));
        } catch (error) {
            console.log(error);
        }
    };

    const toggleCategoryForm = () => {
        if (showTaskForm) {
            setShowTaskForm(false);
        }
        setShowCategoryForm((prev) => !prev);
    };

    const toggleTaskForm = () => {
        if (showCategoryForm) {
            setShowCategoryForm(false);
        }
        setShowTaskForm((prev) => !prev);
    };

    const closeCategoryForm = () => {
        setShowCategoryForm(false);
    };

    const closeTaskForm = () => {
        setShowTaskForm(false);
    };

    const capitalizeFirst = str => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };


    if (loading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }

    return (
        <>
            <h1>Home Page</h1> 
            <div className='category-task-buttons'> { categories.length > 0 && 
                <button className='category-button' onClick={toggleTaskForm}>Add Task</button>
            }
                <button className='category-button' onClick={toggleCategoryForm}>Add Category</button>
            </div>
            <div className='home-container'>
            {showCategoryForm && ( // Conditionally render CategoryForm
                <div className="category-form-container">
                    <CategoryForm
                        categories={categories}
                        setCategories={setCategories}
                        times={times}
                        priorities={priorities}
                        closeCategoryForm={closeCategoryForm}
                    />
                </div>
            )}

            {showTaskForm && ( // Conditionally render CategoryForm
                <div className="category-form-container">
                    <TasksForm
                        categories={categories}
                        setCategories={setCategories}
                        times={times}
                        priorities={priorities}
                        closeTaskForm={closeTaskForm}
                        uploadImage={uploadImage}
                    />
                </div>
            )}

            <div className='grid-bounds'>
                <div className='grid-container horizontal'>
                    <p style={{ color: 'black', position: 'absolute', left: '55%', top: '-5%'}}>Time: Slow</p>
                    <p style={{ color: 'black', position: 'absolute', left: '55%', bottom: '0%'}}>Time: Fast</p>
                    <p style={{ color: 'black', position: 'absolute', left: '0%', top: '50%' }}>Priority: Low</p>
                    <p style={{ color: 'black', position: 'absolute', right: '0%', top: '50%' }}>Priority: High</p>
                    <div style={{borderBottom: '1px solid rgba(0, 0, 0, 0.8)'}}>
                        {quadrant1.map((category) => (
                            <Draggable 
                                bounds='.grid-bounds'
                                defaultPosition={category.position || { x: 0, y: 0 }}
                                onStop={(e, data) => handleDragStop(category, { x: data.x, y: data.y })}
                                key={category._id}
                            >
                                <div className='category' key={category._id}>
                                    <div className='title'>
                                        <button className='delete-button' onClick={ () => deleteCategory(category) }>&times;</button>
                                        <h1 style={{color: 'white'}}>{capitalizeFirst(category.name)}</h1>
                                    </div>
                                    <TasksList category={category} searchQuery={searchQuery} />
                                    <Link to={`/categories/${category._id}/tasks`}>
                                        <IoIosArrowRoundForward />
                                    </Link>
                                </div>
                            </Draggable>
                        ))}
                    </div>
                    <div className='vertical' style={{borderBottom: '1px solid rgba(0, 0, 0, 0.8)', borderLeft: '1px solid rgba(0, 0, 0, 0.8)', height: '400px'}}>
                        {quadrant3.map((category) => (
                            <Draggable 
                                bounds='.grid-bounds'
                                defaultPosition={category.position || { x: 0, y: 0 }}
                                onStop={(e, data) => handleDragStop(category, { x: data.x, y: data.y })}
                                key={category._id}
                            >
                                <div className='category'  key={category._id} >
                                    <div className='title'>
                                        <button className='delete-button' onClick={ () => deleteCategory(category) }>&times;</button>
                                        <h1>{capitalizeFirst(category.name)}</h1>
                                    </div>
                                    <TasksList category={category} searchQuery={searchQuery} />
                                    {category.tasks.length > 0 && (
                                    <Link to={`/categories/${category._id}/tasks`}>
                                        <IoIosArrowRoundForward />
                                    </Link>
                                    )}
                                </div>
                            </Draggable>
                        ))}
                    </div>
                    <div style={{height: '400px'}}>
                        {quadrant2.map((category) => (
                            <Draggable 
                                bounds='.grid-bounds'
                                defaultPosition={category.position || { x: 0, y: 0 }}
                                onStop={(e, data) => handleDragStop(category, { x: data.x, y: data.y })}
                                key={category._id}
                            >
                                <div className='category' key={category._id}>
                                    <div className='title'>
                                        <button className='delete-button' onClick={ () => deleteCategory(category) }>&times;</button>
                                        <h1>{capitalizeFirst(category.name)}</h1>
                                    </div>
                                    <TasksList  category={category} searchQuery={searchQuery} />
                                    <Link to={`/categories/${category._id}/tasks`}>
                                        <IoIosArrowRoundForward />
                                    </Link>
                                </div>
                            </Draggable>
                        ))}
                    </div>
                    <div style={{borderLeft: '1px solid rgba(0, 0, 0, 0.8)'}}>
                        {quadrant4.map((category) => (
                            <Draggable 
                                bounds='.grid-bounds'
                                defaultPosition={category.position || { x: 0, y: 0 }}
                                onStop={(e, data) => handleDragStop(category, { x: data.x, y: data.y })}
                                key={category._id}
                            >
                                <div className='category' key={category._id}>
                                    <div className='title'>
                                        <button className='delete-button' onClick={ () => deleteCategory(category) }>&times;</button>
                                        <h1>{capitalizeFirst(category.name)}</h1>
                                    </div>
                                    <TasksList category={category} searchQuery={searchQuery} />
                                    <Link to={`/categories/${category._id}/tasks`}>
                                        <IoIosArrowRoundForward />
                                    </Link>
                                </div>
                            </Draggable>
                        ))}
                    </div>    
                </div>
                </div>
            </div>
        </>
    );
}