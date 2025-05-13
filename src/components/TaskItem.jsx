import React from 'react';

const TaskItem = React.memo(({ task, index, toggleTask, deleteTask }) => {
    console.log(index,"index")
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <span onClick={() => toggleTask(task.id)}>{task.text}</span>
      <button onClick={() => deleteTask(task.id)}>❌</button>
    </div>
  );
});

export default TaskItem;
