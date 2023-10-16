import React, { useState } from "react";
import { useDispatch } from "react-redux";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Menu, MenuItem } from "@mui/material";
import UserTransferModal from "../../../pages/user/modal/UserTransferModal";
import { TRequestEquipment } from "../../../interfaces/equipment-interface";
import { transferEquipmentAction } from "../../../stores/actions/user-actions";
import { getEquipmentAction } from "../../../stores/actions/equipment-actions";
import {
  confirmRequestEquipmentAction,
  getRequestEquipmentAction,
  rejectRequestEquipmentAction,
} from "../../../stores/actions/request-actions";
import ConfirmModal from "../../modal/ConfirmModal";

interface IProps {
  requestDetail: TRequestEquipment;
}

const RequestActionColumn = ({ requestDetail }: IProps) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isRejecting, setIsRejecting] = useState(false);
  const [isOpenTransferModal, setIsOpenTransferModal] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGetEquipments = () => {
    dispatch(getEquipmentAction());
  };

  const handleConfirm = () => {
    dispatch(confirmRequestEquipmentAction(requestDetail.id, handleGetRequest));
  };

  const handleGetRequest = () => {
    dispatch(getRequestEquipmentAction());
  };

  const handleTransferEquipment = (equipmentIds: number[]) => {
    console.log(equipmentIds);
    dispatch(
      transferEquipmentAction(
        { userId: requestDetail?.userId, equipmentIds },
        () => {
          handleGetEquipments();
          handleConfirm();
        }
      )
    );
  };

  const handleRejectRequestEquipment = () => {
    dispatch(rejectRequestEquipmentAction(requestDetail.id, handleGetRequest));
  };

  if (requestDetail.state === "PENDING") {
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
              setIsOpenTransferModal(true);
            }}
          >
            Transfer
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              setIsRejecting(true);
            }}
          >
            Reject
          </MenuItem>
        </Menu>

        <UserTransferModal
          selectedUserId={requestDetail?.userId}
          isOpenModal={isOpenTransferModal}
          onCloseModal={() => setIsOpenTransferModal(false)}
          onTransfer={handleTransferEquipment}
          categoryId={requestDetail?.requestEquipmentTypeId}
        />

        <ConfirmModal
          isOpen={isRejecting}
          title="Do you want reject this request?"
          onConfirm={handleRejectRequestEquipment}
          onCancel={() => setIsRejecting(false)}
        />
      </div>
    );
  }
  return <div></div>;
};

export default RequestActionColumn;
