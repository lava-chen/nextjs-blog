import React from "react";

interface TableWrapperProps {
  children: React.ReactNode; // 明确指定 children 的类型
}

const TableWrapper: React.FC<TableWrapperProps> = ({ children }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table>{children}</table>
    </div>
  );
};

export default TableWrapper;
