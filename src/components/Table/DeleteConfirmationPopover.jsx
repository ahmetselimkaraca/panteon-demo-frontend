import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";

import DeleteIcon from "../icons/DeleteIcon";

const DeleteConfirmationPopover = ({ onConfirm }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setIsOpen(false);
  };

  return (
    <Popover
      placement="left"
      showArrow
      isOpen={isOpen}
      onOpenChange={setIsOpen}
    >
      <PopoverTrigger>
        <span
          className="text-danger cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <DeleteIcon />
        </span>
      </PopoverTrigger>
      <PopoverContent>
        <div className="p-2">
          <p className="mb-2">Delete configuration?</p>
          <div className="flex justify-end gap-2">
            <Button size="sm" variant="light" onPress={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              size="sm"
              color="danger"
              onPress={handleConfirm}
              variant="light"
              className="font-bold"
            >
              Confirm
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DeleteConfirmationPopover;
