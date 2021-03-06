import React from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import logo from '../../assets/images/logo.png';
import { FcOk } from "react-icons/fc";

const Navbar = () => {

    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const logout = () => {
        signOut(auth)
        navigate("/");
    }

    const menuItems = <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/review">Review</Link></li>
        <li><Link to="/portfolio">Portfolio</Link></li>
        <li><Link to="/blogs">Blogs</Link></li>
        {
            user && <li><Link to="/dashboard">Dashboard</Link></li>
        }
        {
            user && <p className='text-sm text-pink-600 font-extrabold w-36 h-auto flex justify-center items-center hover:text-white'><span><FcOk /></span> {user.displayName}</p>
        }

        {/* --------------------------Logout toggle method------------------------------ */}
        <li>{user ? <button className="btn btn-ghost text-pink-500 font-bold md:mr-0" onClick={logout}>Log Out</button>
            : <Link to="/login">Login</Link>
        }</li>

    </>
    return (
        <div className="navbar w-screen bg-accent">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex="0" className="btn btn-black lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-accent rounded-box w-52">
                        {menuItems}
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost uppercase 
                    font-serif font-extrabold text-sm lg:text-xl xl:text-3xl text-purple-700 hover:text-white hover:underline hover:rounded-full"> TESLA
                    <button className="btn btn-circle btn-outline btn-sm border hover:bg-white p-2">
                        <img className='w-10' src={logo} alt="logo" />
                    </button>
                    MANUFACTURING
                </Link>
            </div>
            <div className="navbar-end hidden lg:flex lg:pr-10 h-28">
                <ul className="menu menu-horizontal p-0 font-bold font-serif text-black">
                    {menuItems}
                </ul>
            </div>
            <div className="navbar-end lg:w-0">
                <label tabIndex="1" htmlFor="dashboard-sidebar" className="btn btn-black lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
            </div>

        </div>
    );
};

export default Navbar;