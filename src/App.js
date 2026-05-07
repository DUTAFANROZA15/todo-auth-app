import React from 'react';
import { AppProvider, useApp } from './utils/AppContext';
import LoginPage from './pages/LoginPage';
import TodoPage from './pages/TodoPage';

function AppContent() {
  const { state } = useApp();
  return state.isAuthenticated ? <TodoPage /> : <LoginPage />;
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;