import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Menu, MenuItem } from "@mui/material";
import { useDispatch } from "react-redux";
import { ICategory } from "../../../interfaces/category-interface";
import CategoryModal from "../../../pages/category/Modal/CategoryModal";
import {
  getCategory,
  updateCategoryAction,
} from "../../../stores/actions/category-actions";
import ModalEquipmentByCate from "../../../pages/category/Modal/ModalEquipmentByCate";

interface IActionColumnProps {
  categoryDetail: ICategory;
}

const ActionColumn = ({ categoryDetail }: IActionColumnProps) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [isOpenModalEquipment, setIsOpenModalEquipment] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGetCategory = () => {
    dispatch(getCategory());
  };

  const handleUpdateCategory = (values: { name: string }) => {
    dispatch(
      updateCategoryAction(
        { id: categoryDetail.id, ...values },
        handleGetCategory
      )
    );
  };

  return (
    <div className="EquipmentCard__menu">
      <MoreVertIcon onClick={(e) => handleClick(e)} />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            setIsOpenUpdateModal(true);
          }}
        >
          Update
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            setIsOpenModalEquipment(true);
          }}
        >
          Check Equipments
        </MenuItem>
      </Menu>
      <CategoryModal
        isUpdateModal
        categoryData={categoryDetail}
        isOpenModal={isOpenUpdateModal}
        onUpdateCategory={handleUpdateCategory}
        onCloseModal={() => setIsOpenUpdateModal(false)}
      />
      <ModalEquipmentByCate
        isOpen={isOpenModalEquipment}
        onClose={() => setIsOpenModalEquipment(false)}
        categoryDetail={categoryDetail}
      />
    </div>
  );
};

export default ActionColumn;
