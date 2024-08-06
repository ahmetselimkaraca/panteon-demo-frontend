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

const ConfigSummaryModal = ({
  isConfirmationOpen,
  setIsConfirmationOpen,
  newConfig,
  handleConfirmAdd,
}) => {
  const handleCancel = () => {
    setIsConfirmationOpen(false);
  };

  return (
    <Modal isOpen={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Confirm New Configuration
            </ModalHeader>
            <ModalBody>
              <ConfigCard config={newConfig} />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={handleCancel}>
                Go Back
              </Button>
              <Button color="primary" onPress={handleConfirmAdd}>
                Confirm
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ConfigSummaryModal;
