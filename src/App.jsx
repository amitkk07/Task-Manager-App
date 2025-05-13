import React, { useState } from 'react';
import './styles/App.css';
import { TaskProvider } from './context/TaskContext';
import Header from './components/Header';
import TaskList from './components/TaskList';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [theme, setTheme] = useState('light');

  return (
    <div className={`app ${theme}`}>
      <TaskProvider>
        <div className="container">
          <Header />
          <ThemeToggle theme={theme} setTheme={setTheme} />
          <TaskList />
        </div>
      </TaskProvider>
    </div>
  );
}

export default App;
