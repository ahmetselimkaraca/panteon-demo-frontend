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
  const [originalConfig, setOriginalConfig] = useState(newConfig);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const fetchRef = useRef(false);

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
      setIsConfirmationOpen(true);
    }
  };

  const handleUpdateWithValidation = async () => {
    if (handleValidation()) {
      await handleUpdate();
      onOpenChange(false);
    }
  };

  const handleConfirmAdd = async () => {
    await handleAdd();
    setIsConfirmationOpen(false);
    onOpenChange(false);
  };

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
