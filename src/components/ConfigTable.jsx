import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import {
  getConfigurations,
  deleteConfiguration,
  createConfiguration,
  updateConfiguration,
} from "../services/api";
import DeleteIcon from "./icons/DeleteIcon";
import EditIcon from "./icons/EditIcon";
import BuildingIcon from "./icons/BuildingIcon";
import ConfigModal from "./ConfigModal";
import TableSkeleton from "./TableSkeleton";
import { useDisclosure } from "@nextui-org/react";

const ConfigTable = () => {
  const [loading, setLoading] = useState(false);
  const [configurations, setConfigurations] = useState([]);
  const [newConfig, setNewConfig] = useState({
    buildingType: "",
    buildingCost: "",
    constructionTime: "",
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isEditMode, setIsEditMode] = useState(false);

  const list = useAsyncList({
    async load() {
      const response = await getConfigurations();
      return {
        items: response.data,
      };
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          let first = a[sortDescriptor.column];
          let second = b[sortDescriptor.column];
          let cmp =
            (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

          if (sortDescriptor.direction === "descending") {
            cmp *= -1;
          }

          return cmp;
        }),
      };
    },
  });

  useEffect(() => {
    fetchConfigurations();
  }, []);

  useEffect(() => {
    list.reload();
  }, [configurations]);

  const fetchConfigurations = async () => {
    try {
      setLoading(true);
      // sleep for 1 second to show skeleton loader
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await getConfigurations();
      setConfigurations(response.data);
      setLoading(false);
    } catch (error) {
      handleAuthError(error);
      setLoading(false);
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
      fetchConfigurations(); // Fetch updated configurations
    } catch (error) {
      handleAuthError(error);
    }
  };

  const renderCell = (config, columnKey) => {
    const cellValue = config[columnKey];

    switch (columnKey) {
      case "buildingType":
        return cellValue;
      case "buildingCost":
        return `${cellValue}`;
      case "constructionTime":
        return `${cellValue}`;
      case "actions":
        return (
          <div className="flex justify-center items-center gap-2">
            <span className="cursor-pointer" onClick={() => handleEdit(config)}>
              <EditIcon />
            </span>
            <span
              className=" text-danger cursor-pointer"
              onClick={() => handleDelete(config.buildingType)}
            >
              <DeleteIcon />
            </span>
          </div>
        );
      default:
        return cellValue;
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <Input placeholder="Search Configurations" clearable />
          <Select placeholder="Filter by Type" fullWidth>
            <SelectItem key="type1">Type 1</SelectItem>
            <SelectItem key="type2">Type 2</SelectItem>
            <SelectItem key="type3">Type 3</SelectItem>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button
            color="success"
            onPress={() => {
              setIsEditMode(false);
              onOpen();
            }}
          >
            Add Configuration
          </Button>
          <Button color="secondary">Export Data</Button>
        </div>
      </div>
      {loading ? (
        <TableSkeleton />
      ) : (
        <Table
          aria-label="Configurations Table with Actions"
          sortDescriptor={list.sortDescriptor}
          onSortChange={list.sort}
          className=""
        >
          <TableHeader>
            <TableColumn key="buildingType" allowsSorting align="center">
              <div className="flex items-center justify-center gap-1">
                <span>Building Type</span>
                <BuildingIcon className="text-danger" />
              </div>
            </TableColumn>
            <TableColumn key="buildingCost" allowsSorting align="center">
              <div className="flex items-center justify-center gap-1">
                <span>Building Cost</span>
                <BuildingIcon className="text-danger" />
              </div>
            </TableColumn>
            <TableColumn key="constructionTime" allowsSorting align="center">
              <div className="flex items-center justify-center gap-1">
                <span>Construction Time</span>
                <BuildingIcon className="text-danger" />
              </div>
            </TableColumn>
            <TableColumn key="actions" align="center">
              <div className="flex items-center justify-center gap-1">
                <span>Actions</span>
                <BuildingIcon className="text-danger" />
              </div>
            </TableColumn>
          </TableHeader>
          <TableBody items={list.items}>
            {(item) => (
              <TableRow key={item.buildingType}>
                {[
                  "buildingType",
                  "buildingCost",
                  "constructionTime",
                  "actions",
                ].map((columnKey) => (
                  <TableCell key={columnKey} className="text-center">
                    {renderCell(item, columnKey)}
                  </TableCell>
                ))}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
      <ConfigModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        newConfig={newConfig}
        setNewConfig={setNewConfig}
        handleAdd={handleAdd}
        handleUpdate={handleUpdate}
        configurations={configurations}
        isEditMode={isEditMode}
      />
    </div>
  );
};

export default ConfigTable;
