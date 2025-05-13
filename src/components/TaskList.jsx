import React, { useContext, useMemo, useState, useCallback } from 'react';
import { TaskContext } from '../context/TaskContext';
import TaskItem from './TaskItem';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TaskList = () => {
  const { tasks, toggleTask, deleteTask, setTasks } = useContext(TaskContext);
  const [filter, setFilter] = useState('All');

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'Completed':
        return tasks.filter(task => task.completed);
      case 'Pending':
        return tasks.filter(task => !task.completed);
      default:
        return tasks;
    }
  }, [filter, tasks]);

  const handleDragEnd = useCallback((result) => {
    if (!result.destination) return;
    const reordered = Array.from(filteredTasks);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    // We need to map reordered filtered list to full list
    const updatedTasks = tasks.map(task => reordered.find(t => t.id === task.id) || task);
    setTasks(updatedTasks);
  }, [filteredTasks, tasks, setTasks]);

  return (
    <div className="task-list">
      <div className="filters">
        {['All', 'Completed', 'Pending'].map(status => (
          <button
            key={status}
            className={filter === status ? 'active' : ''}
            onClick={() => setFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div
              className="tasks"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {filteredTasks.map((task, index) => (
                <Draggable
                  key={task.id}
                  draggableId={String(task.id)}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TaskItem
                        task={task}
                        index={index}
                        toggleTask={toggleTask}
                        deleteTask={deleteTask}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TaskList;
