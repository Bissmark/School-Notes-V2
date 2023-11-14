import { useState } from 'react';
import './TasksList.css';
import { Link } from 'react-router-dom';

export default function TasksList ({searchQuery, category}) {
    const [reverse, setReverse] = useState(false);
    
    return (
        <div>
            {category.tasks.filter((task) => task.name.toLowerCase().includes(searchQuery.toLowerCase())).map((t) => (
                <div key={t._id} className='task'>
                    <ul>
                        <Link to={`/tasks/${t._id}`}><li>{ t.name }</li></Link>
                    </ul>
                </div>
            ))}
        </div>   
    )
}
