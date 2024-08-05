// src/components/ConfigCard.jsx
import React from "react";
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";

const ConfigCard = ({ config }) => {
  return (
    <Card className="max-w-[400px] mb-4">
      <CardHeader className="flex justify-center">
        <h3 className="text-2xl font-bold text-center">
          {config.buildingType}
        </h3>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>Building Cost: {config.buildingCost}</p>
        <p>Construction Time: {config.constructionTime} mins</p>
      </CardBody>
    </Card>
  );
};

export default ConfigCard;
