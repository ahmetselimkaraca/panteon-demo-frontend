import React, { useEffect, useState, useRef } from "react";
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
} from "@nextui-org/react";
import { getBuildingTypes } from "../../services/api";
import ConfigCard from "./ConfigCard";
import ConfigSummaryModal from "./ConfigSummaryModal";

// ConfigModal component handles both adding and editing configurations
const ConfigModal = ({
  isOpen, // Boolean to control if the modal is open
  onOpenChange, // Function to toggle the modal open state
  newConfig, // The new or existing configuration being edited
  setNewConfig, // Function to update the newConfig state
  handleAdd, // Function to handle adding a new configuration
  handleUpdate, // Function to handle updating an existing configuration
  configurations, // List of existing configurations
  isEditMode, // Boolean to determine if the modal is in edit mode
}) => {
  // State for storing building types fetched from the API
  const [buildingTypes, setBuildingTypes] = useState([]);
  // State for storing validation errors
  const [errors, setErrors] = useState({
    buildingCost: false,
    constructionTime: false,
  });
  // State to keep a copy of the original configuration before editing
  const [originalConfig, setOriginalConfig] = useState(newConfig);
  // State to control the confirmation modal for adding a new configuration
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  // Ref to prevent multiple fetch calls for building types
  const fetchRef = useRef(false);

  // Fetch building types once when the component is mounted
  useEffect(() => {
    if (fetchRef.current) return;
    fetchRef.current = true;

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

  // Reset the configuration states based on whether the modal is in edit mode or not
  useEffect(() => {
    if (isOpen && isEditMode) {
      setOriginalConfig(newConfig);
    }
    if (isOpen && !isEditMode) {
      setNewConfig({
        buildingType: "",
        buildingCost: "",
        constructionTime: "",
      });
    }
  }, [isOpen, isEditMode, setNewConfig]);

  // Validation functions for building cost and construction time
  const validateBuildingCost = (value) => value > 0;
  const validateConstructionTime = (value) => value >= 30 && value <= 1800;

  // Function to validate the configuration inputs
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

  // Handle adding a new configuration with validation
  const handleAddWithValidation = async () => {
    if (handleValidation()) {
      setIsConfirmationOpen(true);
    }
  };

  // Handle updating an existing configuration with validation
  const handleUpdateWithValidation = async () => {
    if (handleValidation()) {
      await handleUpdate();
      onOpenChange(false);
    }
  };

  // Confirm adding a new configuration
  const handleConfirmAdd = async () => {
    await handleAdd();
    setIsConfirmationOpen(false);
    onOpenChange(false);
  };

  // Filter out building types that are already used in existing configurations
  const availableBuildingTypes = buildingTypes.filter(
    (type) => !configurations.some((config) => config.buildingType === type)
  );

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                {isEditMode ? "Edit Configuration" : "Add Configuration"}
              </ModalHeader>
              <ModalBody>
                {isEditMode && <ConfigCard config={originalConfig} />}
                {!isEditMode && (
                  <Select
                    label="Select a building type"
                    value={newConfig.buildingType}
                    onChange={(e) =>
                      setNewConfig({
                        ...newConfig,
                        buildingType: e.target.value,
                      })
                    }
                    className="mb-2"
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
                  Cancel
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

      <ConfigSummaryModal
        isConfirmationOpen={isConfirmationOpen}
        setIsConfirmationOpen={setIsConfirmationOpen}
        newConfig={newConfig}
        handleConfirmAdd={handleConfirmAdd}
      />
    </>
  );
};

export default ConfigModal;
