import React from "react";

interface CustomDivProps {
  active: boolean;
  icon: React.ReactNode;
}

const CustomDiv: React.FC<CustomDivProps> = ({ active, icon }) => {
  return (
    <div
      className={`${
        active
          ? "bg-primary text-primary-foreground hover:bg-primary/90 h-10 w-10"
          : "border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10"
      } inline-flex items-center justify-center rounded-md transition-colors`}
    >
      {icon}
    </div>
  );
};

export default CustomDiv;
