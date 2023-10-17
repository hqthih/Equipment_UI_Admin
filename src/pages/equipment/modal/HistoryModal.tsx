import { useSelector } from "react-redux";
import Modal from "../../../components/modal/Modal";
import Table, {
  historyColumn,
  userColumn,
} from "../../../components/table/Table";
import { TRootState } from "../../../stores/reducers";
import { EEquipmentActions } from "../../../stores/actions/equipment-actions/constants";

interface IHistoryModalProps {
  isOpenModal: boolean;
  onCloseModal: () => void;
  transferredUserIds: number[];
}

const HistoryModal = ({
  isOpenModal,
  onCloseModal,
  transferredUserIds,
}: IHistoryModalProps) => {
  const userData = useSelector(
    (state: TRootState) => state.equipment.historyTableData
  );
  const loading = useSelector(
    (state: TRootState) =>
      state.loading[EEquipmentActions.HISTORY_TRANSFER_EQUIPMENT]
  );

  return (
    <Modal
      open={isOpenModal}
      handleCloseModal={() => {
        onCloseModal();
      }}
      title="History transferred user modal"
    >
      <div>
        <Table
          columns={historyColumn}
          rows={userData}
          notCheckBoxSelection
          isLoading={loading}
        />
      </div>
    </Modal>
  );
};

export default HistoryModal;
