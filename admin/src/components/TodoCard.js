import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Divider,
  Checkbox,
  Stack,
  Flex,
  Icon,
  IconButton,
  IconButtonGroup,
} from '@strapi/design-system';
import { Trash, Plus, Pencil } from '@strapi/icons';
import styled from 'styled-components';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';
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

function useRelatedTasks() {
  const { initialData, isSingleType, slug } = useCMEditViewDataManager();
  const [status, setStatus] = useState('loading');
  const [tasks, setTasks] = useState([]);

  const refetchTasks = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/todo/tasks/${slug}?id=${isSingleType ? '' : initialData.id}`
      );

      setTasks(data);
      setStatus('success');
    } catch (e) {
      setStatus('error');
    }
  };

  useEffect(() => {
    refetchTasks();
  }, [initialData, isSingleType, axiosInstance, setTasks, setStatus]);

  return { status, tasks, refetchTasks };
}

const TodoCard = () => {
  const [createModalIsShown, setCreateModalIsShown] = useState(false);
  const [editModalIsShown, setEditModalIsShown] = useState(false);
  const { status, tasks, refetchTasks } = useRelatedTasks();

  const toggleTask = async (taskId, isChecked) => {
    // Update task in database
    await axiosInstance.put(`/todo/tasks/${taskId}`, {
      isDone: isChecked,
    });
    // Call API to update local cache
    await refetchTasks();
  };

  const deleteTask = async (taskId) => {
    await axiosInstance.delete(`/todo/tasks/${taskId}`);
    await refetchTasks();
  };

  const showTasks = () => {
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
    return tasks.map((task) => (
      <Wrapper justifyContent="space-between" key={task.id}>
        <Checkbox value={task.isDone} onValueChange={(isChecked) => toggleTask(task.id, isChecked)}>
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
          <IconButton icon={<Pencil />} noBorder label="Edit" onClick={() => editTask(task.id)} />
          <IconButton
            icon={<Trash />}
            noBorder
            label="Delete"
            onClick={() => deleteTask(task.id)}
          />
        </Flex>
      </Wrapper>
    ));
  };

  return (
    <>
      {createModalIsShown && (
        <TaskModal
          action="create"
          handleClose={() => setCreateModalIsShown(false)}
          refetchTasks={refetchTasks}
        />
      )}
      <Box
        as="aside"
        aria-labelledby="additional-informations"
        background="neutral0"
        borderColor="neutral150"
        hasRadius
        paddingBottom={4}
        paddingLeft={4}
        paddingRight={4}
        paddingTop={3}
        shadow="tableShadow"
      >
        <Typography variant="sigma" textColor="neutral600" id="additional-informations">
          Todos
        </Typography>
        <Box paddingTop={2} paddingBottom={6}>
          <Box paddingBottom={2}>
            <Divider />
          </Box>
          <Typography
            fontSize={2}
            textColor="primary600"
            as="button"
            type="button"
            onClick={() => setCreateModalIsShown(true)}
          >
            <Flex>
              <Icon as={Plus} color="primary600" marginRight={2} width={3} height={3} />
              Add todo
            </Flex>
          </Typography>

          <Stack paddingTop={3}>{showTasks()}</Stack>
        </Box>
      </Box>
    </>
  );
};

export default TodoCard;
