import React from 'react';
import { useApp } from '../utils/AppContext';
import '../styles/global.css';

function Navbar() {
  const { state, logout } = useApp();

  return (
    <nav className="navbar">
      <h1>✅ Todo List App</h1>
      <div className="user-info">
        <span>Halo, {state.currentUser?.name}</span>
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;