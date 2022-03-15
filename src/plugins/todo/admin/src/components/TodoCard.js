import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Divider,
  Checkbox,
  Stack,
  Flex,
  Icon,
} from "@strapi/design-system";
import Plus from "@strapi/icons/Plus";
import { useCMEditViewDataManager } from "@strapi/helper-plugin";
import axiosInstance from "../utils/axiosInstance";
import CreateTaskModal from "./CreateTaskModal";

function useRelatedTasks() {
  const { initialData, isSingleType, slug } = useCMEditViewDataManager();
  const [status, setStatus] = useState("loading");
  const [tasks, setTasks] = useState([]);

  const refetchTasks = async () => {
    try {
      console.log("fetching tasks");
      const { data } = await axiosInstance.get(
        `/content-manager/${
          isSingleType ? "single-types" : "collection-types"
        }/${slug}/${isSingleType ? "" : initialData.id}?populate=tasks`
      );

      setTasks(data.tasks);
      setStatus("success");
    } catch (e) {
      setStatus("error");
    }
  };

  useEffect(() => {
    refetchTasks();
  }, [initialData, isSingleType, axiosInstance, setTasks, setStatus]);

  return { status, tasks, refetchTasks };
}

const TodoCard = () => {
  const [createModalIsShown, setCreateModalIsShown] = useState(false);
  const { status, tasks, refetchTasks } = useRelatedTasks();

  const toggleTask = async (taskId, isChecked) => {
    // Update task in database
    await axiosInstance.put(
      `/content-manager/collection-types/plugin::todo.task/${taskId}`,
      {
        isDone: isChecked,
      }
    );
    // Call API to update local cache
    await refetchTasks();
  };

  const showTasks = () => {
    // Loading state
    if (status === "loading") {
      return <p>Fetching todos...</p>;
    }

    // Error state
    if (status === "error") {
      return <p>Could not fetch tasks.</p>;
    }

    // Empty state
    if (tasks == null || tasks.length === 0) {
      return <p>No todo yet.</p>;
    }

    // Success state, show all tasks
    return tasks.map((task) => (
      <Checkbox
        value={task.isDone}
        onValueChange={(isChecked) => toggleTask(task.id, isChecked)}
        key={task.id}
      >
        <span
          style={{
            textDecoration: task.isDone ? "line-through" : "none",
          }}
        >
          {task.name}
        </span>
      </Checkbox>
    ));
  };

  return (
    <>
      {createModalIsShown && (
        <CreateTaskModal
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
        <Typography
          variant="sigma"
          textColor="neutral600"
          id="additional-informations"
        >
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
              <Icon
                as={Plus}
                color="primary600"
                marginRight={2}
                width={3}
                height={3}
              />
              Add todo
            </Flex>
          </Typography>

          <Stack paddingTop={3} size={2}>
            {showTasks()}
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default TodoCard;
