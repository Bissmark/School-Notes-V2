import { useEffect, useRef, useState } from 'react';
import { Link} from 'react-router-dom';
import TasksList from './TasksList';
import * as categoriesServices from '../utilities/categories-service';
import Draggable from 'react-draggable';
import './HomePage.css';


export default function HomePage({ setCategories, categories, searchQuery }) {
    const [loading, setLoading] = useState(true);

    const quadrant1 = categories.filter((category) => category.time === 'Slow' && category.priority === 'Low');
    const quadrant2 = categories.filter((category) => category.time === 'Fast' && category.priority === 'Low');
    const quadrant3 = categories.filter((category) => category.time === 'Slow' && category.priority === 'High');
    const quadrant4 = categories.filter((category) => category.time === 'Fast' && category.priority === 'High');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesRender = await categoriesServices.getCategories();
                setCategories(categoriesRender);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        fetchCategories()
    }, []);

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
    }


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
            <div> { categories.length > 0 && 
                <Link to='/tasks/new'>
                    <button className='category-button'>Add Task</button>
                </Link>
            }
                <Link to='/categories/new'>
                    <button className='category-button'>Add Category</button>
                </Link>
            </div>
            <div className='grid-bounds'>
                <div className='grid-container horizontal'>
                    <div className='grid-item' style={{borderRight: '1px solid rgba(0, 0, 0, 0.8)'}}>
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
                                            <h1>{category.name}</h1>
                                        </div>
                                        <TasksList category={category} searchQuery={searchQuery} />
                                    </div>
                                </Draggable>
                        ))}
                    </div>
                    <div style={{borderBottom: '1px solid rgba(0, 0, 0, 0.8)', marginBottom: '-1px', height: '400px', overflowY: 'auto'}}>
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
                                        <h1>{category.name}</h1>
                                    </div>
                                    <TasksList category={category} searchQuery={searchQuery} />
                                </div>
                            </Draggable>
                        ))}
                    </div>
                        <div style={{borderTop: '1px solid rgba(0, 0, 0, 0.8)', height: '400px', overflowY: 'auto'}}>
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
                                                <h1>{category.name}</h1>
                                            </div>
                                            <TasksList  category={category} searchQuery={searchQuery} />
                                        </div>
                                    </Draggable>
                                ))}
                        </div>
                        <div style={{borderLeft: '1px solid rgba(0, 0, 0, 0.8)', marginLeft: '-1px', height: '400px', overflowY: 'auto'}}>
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
                                            <h1>{category.name}</h1>
                                        </div>
                                        <TasksList category={category} searchQuery={searchQuery} />
                                    </div>
                                </Draggable>
                            ))}
                        </div>    
                    </div>
            </div>
        </>
    );
}