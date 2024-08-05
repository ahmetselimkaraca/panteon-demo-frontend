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
import {
  getConfigurations,
  deleteConfiguration,
  createConfiguration,
  updateConfiguration,
} from "../../services/api";

import ConfigModal from "../Modal/ConfigModal";
import ViewConfigModal from "../Modal/ViewConfigModal";
import DeleteConfirmationPopover from "./DeleteConfirmationPopover";
import TableSkeleton from "./TableSkeleton";
import { useDisclosure } from "@nextui-org/react";

import EditIcon from "../icons/EditIcon";
import ViewIcon from "../icons/ViewIcon";

const ConfigTable = () => {
  const [loading, setLoading] = useState(false);
  const [configurations, setConfigurations] = useState([]);
  const [sortedConfigurations, setSortedConfigurations] = useState([]);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "buildingType",
    direction: "ascending",
  });
  const [newConfig, setNewConfig] = useState({
    buildingType: "",
    buildingCost: "",
    constructionTime: "",
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [viewConfig, setViewConfig] = useState(null);

  const fetchConfigurations = async () => {
    try {
      setLoading(true);
      const response = await getConfigurations();
      setConfigurations(response.data);
      setSortedConfigurations(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfigurations();
  }, []);

  const handleAdd = async () => {
    try {
      await createConfiguration(newConfig);
      fetchConfigurations(); // Fetch updated configurations
    } catch (error) {
      console.error(error);
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
      console.error(error);
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
      console.error(error);
    }
  };

  const handleView = (config) => {
    setViewConfig(config);
    setIsViewOpen(true);
  };

  const handleUpdateFromView = () => {
    setNewConfig(viewConfig);
    setIsEditMode(true);
    setIsViewOpen(false);
    onOpen();
  };

  const handleSortChange = (descriptor) => {
    setSortDescriptor(descriptor);
    const sorted = [...configurations].sort((a, b) => {
      let first = a[descriptor.column];
      let second = b[descriptor.column];
      let cmp =
        (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

      if (descriptor.direction === "descending") {
        cmp *= -1;
      }

      return cmp;
    });
    setSortedConfigurations(sorted);
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
            <span className="cursor-pointer" onClick={() => handleView(config)}>
              <ViewIcon />
            </span>
            <span
              className="cursor-pointer text-primary"
              onClick={() => handleEdit(config)}
            >
              <EditIcon />
            </span>
            <DeleteConfirmationPopover
              onConfirm={() => handleDelete(config.buildingType)}
            />
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
            color="primary"
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
          sortDescriptor={sortDescriptor}
          onSortChange={handleSortChange}
        >
          <TableHeader>
            <TableColumn key="buildingType" allowsSorting align="center">
              <span>Building Type</span>
            </TableColumn>
            <TableColumn key="buildingCost" allowsSorting align="center">
              <span>Building Cost</span>
            </TableColumn>
            <TableColumn key="constructionTime" allowsSorting align="center">
              <span>Construction Time</span>
            </TableColumn>
            <TableColumn key="actions" align="center">
              <span>Actions</span>
            </TableColumn>
          </TableHeader>
          <TableBody items={sortedConfigurations}>
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
      {viewConfig && (
        <ViewConfigModal
          isViewOpen={isViewOpen}
          setIsViewOpen={setIsViewOpen}
          config={viewConfig}
          handleDelete={handleDelete}
          handleUpdate={handleUpdateFromView}
        />
      )}
    </div>
  );
};

export default ConfigTable;
