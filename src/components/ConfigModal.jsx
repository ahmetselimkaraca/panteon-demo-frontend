import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Select,
  SelectItem,
  Input,
  Card,
  CardHeader,
  CardBody,
  Divider,
} from "@nextui-org/react";
import { getBuildingTypes } from "../services/api";

const ConfigModal = ({
  isOpen,
  onOpenChange,
  newConfig,
  setNewConfig,
  handleAdd,
  handleUpdate,
  configurations,
  isEditMode,
}) => {
  const [buildingTypes, setBuildingTypes] = useState([]);
  const [errors, setErrors] = useState({
    buildingCost: false,
    constructionTime: false,
  });

  useEffect(() => {
    const fetchBuildingTypes = async () => {
      try {
        const response = await getBuildingTypes();
        setBuildingTypes(response.data);
      } catch (error) {
        console.error("Failed to fetch building types:", error);
      }
    };

    fetchBuildingTypes();
  }, []);

  const validateBuildingCost = (value) => value > 0;
  const validateConstructionTime = (value) => value >= 30 && value <= 1800;

  const handleValidation = () => {
    const isValidBuildingCost = validateBuildingCost(newConfig.buildingCost);
    const isValidConstructionTime = validateConstructionTime(
      newConfig.constructionTime
    );

    setErrors({
      buildingCost: !isValidBuildingCost,
      constructionTime: !isValidConstructionTime,
    });

    return isValidBuildingCost && isValidConstructionTime;
  };

  const handleAddWithValidation = async () => {
    if (handleValidation()) {
      await handleAdd();
      onOpenChange(false);
    }
  };

  const handleUpdateWithValidation = async () => {
    if (handleValidation()) {
      await handleUpdate();
      onOpenChange(false);
    }
  };

  // Filter out existing building types from the select options when not in edit mode
  const availableBuildingTypes = buildingTypes.filter(
    (type) =>
      !configurations.some((config) => config.buildingType === type) ||
      isEditMode
  );

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {isEditMode ? "Edit Configuration" : "Add New Building Type"}
            </ModalHeader>
            <ModalBody>
              {isEditMode && (
                <Card className="max-w-[400px] mb-4">
                  <CardHeader>
                    <h3>{newConfig.buildingType}</h3>
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <p>Building Cost: ${newConfig.buildingCost}</p>
                    <p>Construction Time: {newConfig.constructionTime} mins</p>
                  </CardBody>
                </Card>
              )}
              {!isEditMode && (
                <Select
                  label="Select a building type"
                  className="max-w-xs"
                  value={newConfig.buildingType}
                  onChange={(e) =>
                    setNewConfig({
                      ...newConfig,
                      buildingType: e.target.value,
                    })
                  }
                >
                  {availableBuildingTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </Select>
              )}
              <Input
                type="number"
                label="Building Cost"
                value={newConfig.buildingCost}
                isInvalid={errors.buildingCost}
                color={errors.buildingCost ? "danger" : "default"}
                errorMessage="Cost must be greater than 0"
                onChange={(e) =>
                  setNewConfig({
                    ...newConfig,
                    buildingCost: Number(e.target.value),
                  })
                }
              />
              <Input
                type="number"
                label="Construction Time"
                value={newConfig.constructionTime}
                isInvalid={errors.constructionTime}
                color={errors.constructionTime ? "danger" : "default"}
                errorMessage="Time must be between 30 and 1800 seconds"
                onChange={(e) =>
                  setNewConfig({
                    ...newConfig,
                    constructionTime: Number(e.target.value),
                  })
                }
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                color="primary"
                onPress={
                  isEditMode
                    ? handleUpdateWithValidation
                    : handleAddWithValidation
                }
              >
                {isEditMode ? "Update" : "Add"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ConfigModal;
