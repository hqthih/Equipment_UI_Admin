import React from "react";
import Modal from "../../../components/modal/Modal";
import { ICategory } from "../../../interfaces/category-interface";
import Table, {
  categoryColumn,
  equipmentColumn,
  equipmentNoActionColumn,
} from "../../../components/table/Table";
import { useSelector } from "react-redux";
import { TRootState } from "../../../stores/reducers";

interface IProps {
  isOpen: boolean;
  categoryDetail: ICategory;
  onClose: () => void;
}

const ModalEquipmentByCate = ({ isOpen, categoryDetail, onClose }: IProps) => {
  const equipments = useSelector(
    (state: TRootState) => state.equipment.equipments
  ).filter((equipment) => equipment.type === categoryDetail.id);
  return (
    <Modal
      open={isOpen}
      title={`Equipment type '${categoryDetail.name}'`}
      handleCloseModal={onClose}
    >
      <div>
        <Table
          columns={equipmentNoActionColumn}
          rows={equipments}
          notCheckBoxSelection
        />
      </div>
    </Modal>
  );
};

export default ModalEquipmentByCate;
