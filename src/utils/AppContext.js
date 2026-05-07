import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { todoReducer, initialState } from './todoReducer';
import { initialTodos } from '../data/todoData';

// Buat context
const AppContext = createContext();

// Provider component
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  // Load todos awal saat pertama kali aplikasi dibuka
  useEffect(() => {
    dispatch({ type: 'SET_TODOS', payload: initialTodos });
  }, []);

  // Fungsi-fungsi yang bisa dipakai di seluruh aplikasi
  const login = (user) => {
    dispatch({ type: 'LOGIN', payload: user });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const addTodo = (todoData) => {
    dispatch({ type: 'ADD_TODO', payload: todoData });
  };

  const deleteTodo = (id) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  const toggleTodo = (id) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  const editTodo = (id, data) => {
    dispatch({ type: 'EDIT_TODO', payload: { id, data } });
  };

  const shareTodo = (todoId, userId) => {
    dispatch({ type: 'SHARE_TODO', payload: { todoId, userId } });
  };

  // Ambil todos yang relevan untuk user yang sedang login
  const getMyTodos = () => {
    if (!state.currentUser) return [];
    return state.todos.filter(
      (todo) =>
        todo.ownerId === state.currentUser.id ||
        todo.sharedWith.includes(state.currentUser.id)
    );
  };

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        login,
        logout,
        addTodo,
        deleteTodo,
        toggleTodo,
        editTodo,
        shareTodo,
        getMyTodos,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// Custom hook untuk pakai context
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp harus digunakan di dalam AppProvider');
  }
  return context;
}

export default AppContext;