import React, { useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  Flex,
  Icon,
  IconButton,
  IconButtonGroup,
} from '@strapi/design-system';
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
          <Box paddingTop={3}>
            <TasksList status={status} tasks={tasks} refetchTasks={refetchTasks} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default TodoCard;
