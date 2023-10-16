import React from "react";
import { useSelector } from "react-redux";
import { TRootState } from "../../../stores/reducers";

interface ITypeColumnProps {
  categoryId: number;
}

const TypeColumn = ({ categoryId }: ITypeColumnProps) => {
  const categories = useSelector(
    (state: TRootState) => state.categoryReducer.categories
  );

  return (
    <div style={{ fontWeight: "bold" }}>
      {categories.find((category) => category.id === categoryId)?.name}
    </div>
  );
};

export default TypeColumn;
