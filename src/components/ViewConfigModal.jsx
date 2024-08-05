import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import ConfigCard from "./ConfigCard";

const ViewConfigModal = ({
  isViewOpen,
  setIsViewOpen,
  config,
  handleDelete,
  handleUpdate,
}) => {
  const handleClose = () => {
    setIsViewOpen(false);
  };

  return (
    <Modal isOpen={isViewOpen} onOpenChange={setIsViewOpen}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              View Configuration
            </ModalHeader>
            <ModalBody>
              <ConfigCard config={config} />
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={() => {
                  handleDelete(config.buildingType);
                  handleClose();
                }}
              >
                Delete
              </Button>
              <Button
                color="primary"
                onPress={() => {
                  handleUpdate();
                }}
              >
                Update
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ViewConfigModal;
