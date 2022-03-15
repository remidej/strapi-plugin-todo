import React, { useState } from "react";
import {
  ModalLayout,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Typography,
  Button,
  TextInput,
} from "@strapi/design-system";
import { useCMEditViewDataManager } from "@strapi/helper-plugin";
import axiosInstance from "../utils/axiosInstance";

const CreateTaskModal = ({ handleClose }) => {
  const { isSingleType, slug, initialData } = useCMEditViewDataManager();
  const handleSubmit = async (e) => {
    // Prevent submitting parent form
    e.preventDefault();
    e.stopPropagation();

    const res = await axiosInstance.put(
      `/content-manager/${
        isSingleType ? "single-types" : "collection-types"
      }/${slug}/${isSingleType ? "" : initialData.id}`,
      {
        data: {
          tasks: [1],
        },
      }
    );
  };

  const [text, setText] = useState("");

  return (
    <ModalLayout
      onClose={handleClose}
      labelledBy="title"
      as="form"
      onSubmit={handleSubmit}
    >
      <ModalHeader>
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          Add todo
        </Typography>
      </ModalHeader>
      <ModalBody>
        <TextInput
          placeholder="What do you need to do?"
          label="Name"
          name="text"
          hint="Max 140 characters"
          error={text.length > 140 ? "Content is too long" : undefined}
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
      </ModalBody>
      <ModalFooter
        startActions={
          <Button onClick={handleClose} variant="tertiary">
            Cancel
          </Button>
        }
        endActions={<Button type="submit">Save</Button>}
      />
    </ModalLayout>
  );
};

export default CreateTaskModal;
