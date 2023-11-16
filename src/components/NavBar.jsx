import { Link } from 'react-router-dom';
import { AiFillAliwangwang } from 'react-icons/ai';
import { AiOutlineHome } from 'react-icons/ai';
import { FiFolderPlus } from 'react-icons/fi';
import { BsFileEarmarkPlus } from 'react-icons/bs';
import { GoSignOut } from 'react-icons/go';
import { GiHamburgerMenu } from 'react-icons/gi';
import * as userService from '../utilities/users-service';
import './NavBar.css';
import SearchBar from './SearchBar';

export default function NavBar({ user, setUser, categories, setSearchQuery }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav className='navbar'>
      <div className='menu-1'>
        <SearchBar setSearchQuery={setSearchQuery} />
      </div>
      <ul className='nav-links'>
        <input type='checkbox' id='checkbox_toggle' />
        <label htmlFor='checkbox_toggle' className='hamburger'><GiHamburgerMenu /></label>
        <div className='menu'>
          <Link className='link' to="/">
          <AiOutlineHome />
          <span className='tooltiptext'>Home</span>
        </Link>
        {/* { categories.length > 0 && <Link className='link' to="/tasks/new">
          <BsFileEarmarkPlus />
          <span className='tooltiptext'>New Task</span>
        </Link>}
        <Link className='link' to="/categories/new">
          <FiFolderPlus />
          <span className='tooltiptext'>New Category</span>
        </Link> */}
        { user ? 
          <Link className='link' onClick={handleLogOut}>
            <GoSignOut />
            <span className='tooltiptext'>Logout</span>
          </Link>
        :
          <>
            <Link className='link' to="/login">
              <AiFillAliwangwang />
              <span className='tooltiptext'>Login</span>
            </Link>
            <Link className='link' to="/signup">
              <AiFillAliwangwang />
              <span className='tooltiptext'>Signup</span>
            </Link>
          </>
        }
        </div>
        
      </ul>
      
      
    </nav>
  );
}