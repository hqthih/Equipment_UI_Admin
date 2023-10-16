import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteRequestEquipmentAction,
  getRequestEquipmentAction,
} from "../../stores/actions/request-actions";
import { TRootState } from "../../stores/reducers";
import Table, { requestTable } from "../../components/table/Table";
import { ERequestActions } from "../../stores/actions/request-actions/constants";
import { getCategory } from "../../stores/actions/category-actions";
import { getUsersAction } from "../../stores/actions/user-actions";
import { Button } from "@mui/material";
import "./RequestPage.scss";
import { TRequestEquipment } from "../../interfaces/equipment-interface";
import ConfirmModal from "../../components/modal/ConfirmModal";

const RequestPage = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state: TRootState) => state.authUser.userData);
  const [selectedRequest, setSelectedRequest] = useState<TRequestEquipment[]>(
    []
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const requestEquipments = useSelector(
    (state: TRootState) => state.requestReducer.requests
  );
  const isLoadingRequest = useSelector(
    (state: TRootState) => state.loading[ERequestActions.GET_REQUEST_EQUIPMENT]
  );

  const handleDeleteRequest = () => {
    const requestIds = selectedRequest.map((request) => request.id);
    dispatch(
      deleteRequestEquipmentAction(requestIds, () => {
        dispatch(getRequestEquipmentAction(userData?.id));
      })
    );
  };

  useEffect(() => {
    dispatch(getRequestEquipmentAction(userData?.id));
    dispatch(getCategory());
    dispatch(getUsersAction());
  }, []);

  return (
    <div className="RequestPage">
      <div className="RequestPage__actions">
        <Button
          color="error"
          variant="contained"
          disabled={selectedRequest.length < 1}
          onClick={() => {
            setIsDeleting(true);
          }}
        >
          Delete
        </Button>
      </div>
      <Table
        columns={requestTable}
        rows={requestEquipments}
        isLoading={isLoadingRequest}
        setSelection={setSelectedRequest}
      />
      <ConfirmModal
        isOpen={isDeleting}
        title="Do you want delete this request?"
        onConfirm={handleDeleteRequest}
        onCancel={() => setIsDeleting(false)}
      />
    </div>
  );
};

export default RequestPage;
