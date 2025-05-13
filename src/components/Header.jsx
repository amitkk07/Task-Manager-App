
import React, { useContext, useState } from 'react';
import { TaskContext } from '../context/TaskContext';

const Header = () => {
  const { addTask } = useContext(TaskContext);
  const [text, setText] = useState('');

  const handleAdd = () => {
    if (text.trim() === '') return;
    addTask(text);
    setText('');
  };

  return (
    <header className="header">
      <h1>Task Manager</h1>
      <div className="task-input">
        <input
          type="text"
          value={text}
          placeholder="Add new task..."
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <button onClick={handleAdd}>Add</button>
      </div>
    </header>
  );
};

export default Header;
