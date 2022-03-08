import React from "react";
import {
  Box,
  Typography,
  Divider,
  Checkbox,
  Stack,
} from "@strapi/design-system";

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
  return (
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
        <Divider />
        <Stack paddingTop={3} size={2}>
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
  );
};

export default TodoCard;
