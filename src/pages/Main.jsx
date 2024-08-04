import { useEffect, useState } from "react";
import {
  getConfigurations,
  deleteConfiguration,
  createConfiguration,
  updateConfiguration,
} from "../services/api";
import ConfigTable from "../components/ConfigTable";
import { Button, useDisclosure } from "@nextui-org/react";
import ConfigModal from "../components/ConfigModal";

function Main() {
  const [configurations, setConfigurations] = useState([]);
  const [newConfig, setNewConfig] = useState({
    buildingType: "",
    buildingCost: "",
    constructionTime: "",
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    fetchConfigurations();
  }, []);

  const fetchConfigurations = async () => {
    try {
      const response = await getConfigurations();
      setConfigurations(response.data);
    } catch (error) {
      handleAuthError(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const handleAuthError = (error) => {
    if (error.response && error.response.status === 401) {
      handleLogout();
    } else {
      console.error(error);
    }
  };

  const handleAdd = async () => {
    try {
      await createConfiguration(newConfig);
      setConfigurations([...configurations, newConfig]); // Update configurations state
      setNewConfig({
        buildingType: "",
        buildingCost: "",
        constructionTime: "",
      });
      fetchConfigurations(); // Fetch updated configurations
    } catch (error) {
      handleAuthError(error);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateConfiguration(newConfig.buildingType, {
        buildingCost: newConfig.buildingCost,
        constructionTime: newConfig.constructionTime,
      });
      fetchConfigurations(); // Fetch updated configurations
    } catch (error) {
      handleAuthError(error);
    }
  };

  const handleEdit = (config) => {
    setNewConfig(config);
    setIsEditMode(true);
    onOpen();
  };

  const handleDelete = async (buildingType) => {
    try {
      await deleteConfiguration(buildingType);
      fetchConfigurations();
    } catch (error) {
      handleAuthError(error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <ConfigTable
        configurations={configurations}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <div className="flex flex-col items-center justify-center">
        <Button
          onPress={() => {
            setIsEditMode(false);
            onOpen();
          }}
          className="m-4"
        >
          Add New Building Type
        </Button>
        <ConfigModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          newConfig={newConfig}
          setNewConfig={setNewConfig}
          handleAdd={handleAdd}
          handleUpdate={handleUpdate}
          configurations={configurations} // Pass configurations to the modal
          isEditMode={isEditMode} // Pass edit mode status to the modal
        />
      </div>
    </div>
  );
}

export default Main;
