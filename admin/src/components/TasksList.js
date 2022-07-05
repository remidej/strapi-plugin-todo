import React, { useState } from 'react';
import styled from 'styled-components';
import { Flex, Checkbox, IconButton } from '@strapi/design-system';
import { Trash, Pencil } from '@strapi/icons';
import axiosInstance from '../utils/axiosInstance';
import TaskModal from './TaskModal';

const Wrapper = styled(Flex)`
  min-height: 2rem;
  > :last-child {
    display: none;
  }
  &:hover {
    > :last-child {
      display: flex;
    }
  }
`;

const TasksList = ({ tasks, status, refetchTasks }) => {
  const [taskBeingEdited, setTaskBeingEdited] = useState(null);

  const toggleTask = async (taskId, isChecked) => {
    // Update task in database
    await axiosInstance.put(`/todo/tasks/${taskId}`, {
      isDone: isChecked,
    });
    // Call API to update local cache
    await refetchTasks();
  };

  const openEditModal = async (taskId) => {
    setTaskBeingEdited(taskId);
  };

  const deleteTask = async (taskId) => {
    await axiosInstance.delete(`/todo/tasks/${taskId}`);
    await refetchTasks();
  };

  // Loading state
  if (status === 'loading') {
    return <p>Fetching todos...</p>;
  }

  // Error state
  if (status === 'error') {
    return <p>Could not fetch tasks.</p>;
  }

  // Empty state
  if (tasks == null || tasks.length === 0) {
    return <p>No todo yet.</p>;
  }

  // Success state, show all tasks
  return (
    <>
      {/* Edit task modal */}
      {taskBeingEdited && (
        <TaskModal
          action="edit"
          handleClose={() => setTaskBeingEdited(null)}
          refetchTasks={refetchTasks}
          task={tasks.find((task) => task.id === taskBeingEdited)}
        />
      )}

      {/* List existing modal */}
      {tasks.map((task) => (
        <Wrapper justifyContent="space-between" key={task.id}>
          <Checkbox
            value={task.isDone}
            onValueChange={(isChecked) => toggleTask(task.id, isChecked)}
          >
            <span
              style={{
                textDecoration: task.isDone ? 'line-through' : 'none',
                display: 'inline-block',
                transform: 'translateY(-1px)',
              }}
            >
              {task.name}
            </span>
          </Checkbox>
          <Flex flexDirection="row" justifyContent="flex-end">
            <IconButton
              icon={<Pencil />}
              noBorder
              label="Edit"
              onClick={() => openEditModal(task.id)}
            />
            <IconButton
              icon={<Trash />}
              noBorder
              label="Delete"
              onClick={() => deleteTask(task.id)}
            />
          </Flex>
        </Wrapper>
      ))}
    </>
  );
};

export default TasksList;
