
import { createContext, useCallback, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage('tasks', []);

  const addTask = useCallback((text) => {
    setTasks(prev => [...prev, { id: Date.now(), text, completed: false }]);
  }, [setTasks]);

  const deleteTask = useCallback((id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, [setTasks]);

  const toggleTask = useCallback((id) => {
    setTasks(prev =>
      prev.map(task => task.id === id ? { ...task, completed: !task.completed } : task)
    );
  }, [setTasks]);

  const value = useMemo(() => ({
    tasks, addTask, deleteTask, toggleTask, setTasks
  }), [tasks, addTask, deleteTask, toggleTask]);

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
