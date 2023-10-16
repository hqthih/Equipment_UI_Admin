import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../components/modal/Modal";
import Table, { equipmentColumn } from "../../../components/table/Table";
import { IEquipmentDetail } from "../../../interfaces/equipment-interface";
import { IUserDetail } from "../../../interfaces/user-interfaces";
import { TRootState } from "../../../stores/reducers";
import { getEquipmentAction } from "../../../stores/actions/equipment-actions";
interface IProps {
  selectedUserId: number;
  isOpenModal: boolean;
  categoryId?: number;
  onCloseModal: () => void;
  onTransfer: (equipmentIds: number[]) => void;
}

const UserTransferModal = ({
  isOpenModal,
  selectedUserId,
  categoryId,
  onCloseModal,
  onTransfer,
}: IProps) => {
  const dispatch = useDispatch();

  const equipmentDatas: IEquipmentDetail[] = useSelector(
    (state: TRootState) => {
      if (categoryId) {
        return state.equipment.equipments?.filter(
          (e: IEquipmentDetail) =>
            e.ownerId != selectedUserId && e.type === categoryId
        );
      }
      return state.equipment.equipments?.filter(
        (e: IEquipmentDetail) => e.ownerId != selectedUserId
      );
    }
  );
  const [selectedEquipment, setSelectedEquipment] = useState<IUserDetail[]>();

  // useEffect(() => {
  //   dispatch(getEquipmentAction());
  // }, [isOpenModal]);

  return (
    <Modal
      open={isOpenModal}
      handleCloseModal={() => {
        onCloseModal();
        setSelectedEquipment([]);
      }}
      title="Transfer Modal"
    >
      <div>
        <Table
          columns={equipmentColumn}
          rows={equipmentDatas}
          setSelection={setSelectedEquipment}
        />

        <div
          style={{
            display: "flex",
            // justifyContent: "space-between",
            alignItems: "center",
            marginTop: "8px",
            gap: "12px",
          }}
        >
          <Button
            variant="contained"
            onClick={() => {
              const selectedEquipmentIds = selectedEquipment?.map(
                (user) => user.id
              );
              selectedEquipment && onTransfer(selectedEquipmentIds || []);
              onCloseModal();
            }}
          >
            Transfer
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default UserTransferModal;
