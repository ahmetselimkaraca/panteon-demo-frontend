import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import DeleteIcon from "./DeleteIcon"; // Import the DeleteIcon component
import EditIcon from "./EditIcon";

const ConfigTable = ({ configurations, onEdit, onDelete }) => {
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
    <Table
      aria-label="Configurations Table with Actions"
      sortDescriptor={list.sortDescriptor}
      onSortChange={list.sort}
      className="w-2/3"
    >
      <TableHeader>
        <TableColumn key="buildingType" allowsSorting align="center">
          Building Type
        </TableColumn>
        <TableColumn key="buildingCost" allowsSorting align="center">
          Building Cost
        </TableColumn>
        <TableColumn key="constructionTime" allowsSorting align="center">
          Construction Time
        </TableColumn>
        <TableColumn key="actions" align="center">
          Actions
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
  );
};

export default ConfigTable;
