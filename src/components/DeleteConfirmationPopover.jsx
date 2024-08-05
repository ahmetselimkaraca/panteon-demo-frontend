// src/components/DeleteConfirmationPopover.jsx
import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";

import DeleteIcon from "./icons/DeleteIcon";

const DeleteConfirmationPopover = ({ onConfirm }) => {
  return (
    <Popover showArrow={true} color="danger">
      <PopoverTrigger>
        <span className="text-danger cursor-pointer">
          <DeleteIcon />
        </span>
      </PopoverTrigger>
      <PopoverContent color="warning">
        <Button size="sm" color="danger" onPress={onConfirm}>
          Confirm
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default DeleteConfirmationPopover;
