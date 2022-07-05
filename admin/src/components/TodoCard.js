import React, { useState } from 'react';
import { Box, Divider, Flex, IconButton, TextButton, Typography } from '@strapi/design-system';
import { Plus } from '@strapi/icons';
import styled from 'styled-components';
import axiosInstance from '../utils/axiosInstance';
import TaskModal from './TaskModal';
import useRelatedTasks from '../hooks/useRelatedTasks';
import TasksList from './TasksList';

const TodoCard = () => {
  const [createModalIsShown, setCreateModalIsShown] = useState(false);
  const { status, tasks, refetchTasks } = useRelatedTasks();

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
          <Flex paddingTop={2} justifyContent="space-between">
            <TextButton startIcon={<Plus />} onClick={() => setCreateModalIsShown(true)}>
              <Typography variant="omega" textColor="primary600">
                Add todo
              </Typography>
            </TextButton>
            <Typography textColor="neutral600" variant="omega">
              {tasks.filter((task) => task.isDone).length}/{tasks.length}
            </Typography>
          </Flex>
          <Box paddingTop={2}>
            <TasksList status={status} tasks={tasks} refetchTasks={refetchTasks} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default TodoCard;
