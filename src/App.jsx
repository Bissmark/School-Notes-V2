import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getUser } from './utilities/users-service';
import AuthPage from './components/AuthPage';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import TasksDetail from './components/TasksDetail';
import TaskForm from './components/TasksForm';
import EditForm from './components/EditForm';
import CategoryForm from './components/CategoryForm';
import './App.css';

const times = [
    'Slow',
    'Fast'
]

const priorities = [
    'Low',
    'High'
]

function App() {
  const [user, setUser] = useState(getUser());
  const [categories, setCategories] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const uploadImage = async (image) => {
		const data = new FormData()
		data.append("file", image)
		data.append("upload_preset", "react-cloudinary")
		data.append("cloud_name", "bissmark")
		return fetch("https://api.cloudinary.com/v1_1/bissmark/image/upload",{
			method: "post",
			body: data
		}).then(res => res.json())
      .catch(err => console.log(err))
	}

  return (
    <div>
      { user ?
        <>
          <NavBar user={user} setUser={setUser} categories={categories} setSearchQuery={setSearchQuery} />
          <div className="container">
          <Routes>
            <Route path="/" element={<HomePage searchQuery={searchQuery} setTasks={setTasks} tasks={tasks} categories={categories} setCategories={setCategories} times={times} priorities={priorities} />} />
            <Route path="/tasks/new" element={<TaskForm tasks={tasks} setTasks={setTasks} setCategories={setCategories} times={times} priorities={priorities} categories={categories} uploadImage={uploadImage} />} />
            <Route path="/tasks/:id" element={<TasksDetail tasks={tasks} setTasks={setTasks} />} />
            <Route path="/tasks/:id/edit" element={<EditForm categories={categories} setCategories={setCategories} tasks={tasks} times={times} priorities={priorities} uploadImage={uploadImage} />} />
            <Route path="/categories/new" element={<CategoryForm tasks={tasks} categories={categories} setCategories={setCategories} times={times} priorities={priorities} />} />
            <Route path="*" element={<Navigate to="/tasks" />} />
          </Routes>
          </div>
        </>
        :
        <AuthPage setUser={setUser} />
        
      }
    
    </div>
  );
}

export default App;
