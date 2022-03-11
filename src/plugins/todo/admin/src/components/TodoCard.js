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

const items = [
  {
    text: "Do some stuff",
    isChecked: false,
  },
  {
    text: "Do some stuff",
    isChecked: true,
  },
  {
    text: "Do some stuff",
    isChecked: false,
  },
];

const TodoCard = () => {
  const [createModalIsShown, setCreateModalIsShown] = useState(false);

  // const { initialData } = useCMEditViewDataManager();

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
            {items.map((item, index) => (
              <Checkbox
                value={item.isChecked}
                onValueChange={(checked) => {
                  console.log("toggle", checked);
                }}
                key={index}
              >
                <span
                  style={{
                    textDecoration: item.isChecked ? "line-through" : "none",
                  }}
                >
                  {item.text}
                </span>
              </Checkbox>
            ))}
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default TodoCard;
