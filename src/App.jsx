import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getUser } from './utilities/users-service';
import * as categoriesServices from './utilities/categories-service';
import AuthPage from './components/AuthPage';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import TasksDetail from './components/TasksDetail';
import TasksForm from './components/TasksForm';
import EditForm from './components/EditForm';
import CategoryForm from './components/CategoryForm';
import './App.css';
import TasksIndexInsideCategory from './components/TasksIndexInsideCategory';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';

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
	};

  return (
    <div>
      { user ?
        <>
        <NavBar user={user} setUser={setUser} categories={categories} setSearchQuery={setSearchQuery} />
          <div className="container">
          <Routes>
            <Route path="/" element={<HomePage searchQuery={searchQuery} setTasks={setTasks} tasks={tasks} categories={categories} setCategories={setCategories} times={times} priorities={priorities} uploadImage={uploadImage} />} />
            <Route path="/categories/:id/task/:id/edit" element={<EditForm categories={categories} setCategories={setCategories} tasks={tasks} times={times} priorities={priorities} uploadImage={uploadImage} />} />
            <Route path="/categories/new" element={<CategoryForm tasks={tasks} categories={categories} setCategories={setCategories} times={times} priorities={priorities} />} />
            <Route path="categories/:id/tasks" element={<TasksIndexInsideCategory tasks={tasks} setTasks={setTasks} setCategories={setCategories} categories={categories} uploadImage={uploadImage} />} />
            <Route path="*" element={<Navigate to="/tasks" />} />
            <Route />
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
