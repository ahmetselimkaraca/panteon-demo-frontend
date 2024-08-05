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
import DeleteIcon from "./icons/DeleteIcon"; // Import the DeleteIcon component
import EditIcon from "./EditIcon";
import BuildingIcon from "./icons/BuildingIcon"; // Import the BuildingIcon component

const ConfigTable = ({ configurations, onEdit, onDelete, onAdd }) => {
  const list = useAsyncList({
    async load() {
      return {
        items: configurations,
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
    list.reload();
  }, [configurations]);

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
          <div className="flex justify-center gap-2">
            <span className="cursor-pointer" onClick={() => onEdit(config)}>
              <EditIcon /> {/* Use the EditIcon component */}
            </span>
            <span
              className="text-danger cursor-pointer"
              onClick={() => onDelete(config.buildingType)}
            >
              <DeleteIcon /> {/* Use the DeleteIcon component */}
            </span>
          </div>
        );
      default:
        return cellValue;
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4"></div>
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
          <Button color="primary" onPress={onAdd}>
            Add Configuration
          </Button>
          <Button color="secondary">Export Data</Button>
        </div>
      </div>
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
    </div>
  );
};

export default ConfigTable;
