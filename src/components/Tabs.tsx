"use client";
import { useState } from "react";

export type TabValue = {
  id: number;
  title: string;
};

type Props = {
  values: TabValue[];
};

export const Tabs: React.FC<Props> = ({ values }) => {
  const [selectedTab, setSelectedTab] = useState<TabValue>(values[0]);

  const handleClick = (value: TabValue) => {
    setSelectedTab(value);
  };

  return (
    <div className="flex items-center bg-white border border-gray-600 rounded-lg w-fit">
      {values.map((value, index) => (
        <button
          key={value.id}
          className={`py-2.5 px-4 text-nowrap text-sm ${
            selectedTab.id === value.id
              ? "text-primary font-bold"
              : "text-gray-900 font-medium"
          } ${index < values.length - 1 ? "border-r border-gray-600" : ""}`}
          onClick={() => handleClick(value)}
        >
          {value.title}
        </button>
      ))}
    </div>
  );
};