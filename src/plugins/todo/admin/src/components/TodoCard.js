import React, { useState } from "react";
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

const TodoCard = () => {
  const [createModalIsShown, setCreateModalIsShown] = useState(true);
  const { initialData } = useCMEditViewDataManager();
  const { tasks } = initialData;

  const toggleTask = async (taskId, isChecked) => {
    const res = await axiosInstance.put();
  };

  return (
    <>
      {createModalIsShown && (
        <CreateTaskModal handleClose={() => setCreateModalIsShown(false)} />
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
            {/* List existing todo items */}
            {tasks ? (
              tasks.map((task) => (
                <Checkbox
                  value={task.isDone}
                  onValueChange={(isChecked) => toggleTask(task.id, isChecked)}
                  key={task.id}
                >
                  <span
                    style={{
                      textDecoration: task.isChecked ? "line-through" : "none",
                    }}
                  >
                    {task.name}
                  </span>
                </Checkbox>
              ))
            ) : (
              <p>No todo yet.</p>
            )}
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default TodoCard;
