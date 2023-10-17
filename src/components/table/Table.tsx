import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  EEquipmentModalType,
  IEquipmentDetail,
  TRequestEquipment,
} from "../../interfaces/equipment-interface";
import { IUserDetail } from "../../interfaces/user-interfaces";
import EquipmentModal from "../../pages/equipment/modal/EquipmentModal";
import HistoryModal from "../../pages/equipment/modal/HistoryModal";
import {
  getEquipmentAction,
  historyTransferEquipmentAction,
  updateEquipmentAction,
} from "../../stores/actions/equipment-actions";
import { EEquipmentActions } from "../../stores/actions/equipment-actions/constants";
import { TRootState } from "../../stores/reducers";
import Modal from "../modal/Modal";
import StateColum from "./request-columns/StateColum";
import TypeColumn from "./request-columns/TypeColumn";
import UserColumn from "./request-columns/UserColumn";
import ActionColumn from "./category-columns/ActionColumn";
import { ICategory } from "../../interfaces/category-interface";
import RequestActionColumn from "./request-columns/RequestActionColumn";
import { historyTransferEquipment } from "../../services/equipment-service";

interface IOwnerEquipmentProps {
  userId: number;
}

const OwnerColumn = ({ userId }: IOwnerEquipmentProps) => {
  const userOwner = useSelector((state: TRootState) =>
    state.user.users.find((u: IUserDetail) => u.id === userId)
  );
  return (
    <div>
      {userOwner?.firstName} {userOwner?.lastName}
    </div>
  );
};

const EquipmentColumn = (userId: number) => {
  const dispatch = useDispatch();
  const loadingEquipment = useSelector(
    (state: TRootState) => state.loading[EEquipmentActions.GET_EQUIPMENT]
  );
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const equipments = useSelector(
    (state: TRootState) => state.equipment.equipments
  );

  const handleGetEquipment = () => {
    dispatch(
      getEquipmentAction({
        ownerId: userId,
        name: searchText,
        pageNo: 0,
        pageSize: 5,
      })
    );
  };

  const handleClickCheck = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setIsOpenModal(true);
    e.stopPropagation();
  };

  const handleClose = () => {
    setIsOpenModal(false);
  };

  const getEquipmentDebounce = useCallback((value: string) => {
    setSearchText(value.trim());
  }, []);

  useEffect(() => {
    if (isOpenModal) {
      handleGetEquipment();
    }
  }, [isOpenModal, searchText, page]);

  return (
    <div>
      <Button variant="contained" onClick={(e) => handleClickCheck(e)}>
        Check
      </Button>
      <Modal
        open={isOpenModal}
        handleCloseModal={handleClose}
        title="Equipment is transferred for this user"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {equipments.length ? (
            <div>
              <Table
                columns={equipmentColumn}
                rows={equipments}
                isLoading={loadingEquipment}
                notCheckBoxSelection
              />
            </div>
          ) : (
            <div style={{ display: "flex", justifyContent: "center" }}>
              No Equipment
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

const EquipmentActionColumn = ({
  equipment,
}: {
  equipment: IEquipmentDetail;
}) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [isOpenHistoryModal, setIsOpenHistoryModal] = useState(false);
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

  const handleUpdateEquipment = (values: any) => {
    console.log(values);
    dispatch(updateEquipmentAction(values, handleGetEquipments));
  };

  const handleClickHistory = () => {
    handleClose();
    setIsOpenHistoryModal(true);
    dispatch(historyTransferEquipmentAction(equipment.id));
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
        <MenuItem onClick={handleClickHistory}>History</MenuItem>
      </Menu>
      <EquipmentModal
        isOpenModal={isOpenUpdateModal}
        equipmentModalType={EEquipmentModalType.UPDATE_EQUIPMENT}
        handleCloseModal={() => setIsOpenUpdateModal(false)}
        onUpdateEquipment={handleUpdateEquipment}
        selectedEquipment={equipment}
      />
      <HistoryModal
        isOpenModal={isOpenHistoryModal}
        onCloseModal={() => setIsOpenHistoryModal(false)}
        transferredUserIds={equipment.transferredUserIds}
      />
    </div>
  );
};

export const equipmentColumn: GridColDef[] = [
  { field: "id", headerName: "ID", width: 50 },
  {
    field: "imageUrl",
    headerName: "Image",
    width: 100,
    renderCell: (params: GridRenderCellParams<IEquipmentDetail>) => (
      <img
        src={params.value}
        style={{ objectFit: "cover", height: "70px", objectPosition: "center" }}
      />
    ),
  },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "type",
    headerName: "Type",
    width: 150,
    renderCell: (params: GridRenderCellParams<IEquipmentDetail>) => (
      <TypeColumn categoryId={params.value} />
    ),
  },
  {
    field: "description",
    headerName: "Description",
    width: 300,
    valueGetter: (params: GridValueGetterParams) => {
      return `${params.value}`;
    },
  },
  {
    field: "ownerId",
    headerName: "Owner",
    width: 150,
    renderCell: (params: GridRenderCellParams<IEquipmentDetail>) => (
      <OwnerColumn userId={params.value} />
    ),
  },
  {
    field: "a",
    headerName: "",
    width: 50,
    renderCell: (params: GridRenderCellParams<IEquipmentDetail>) => (
      <EquipmentActionColumn equipment={params.row} />
    ),
  },
];

export const equipmentNoActionColumn: GridColDef[] = [
  { field: "id", headerName: "ID", width: 50 },
  {
    field: "imageUrl",
    headerName: "Image",
    width: 100,
    renderCell: (params: GridRenderCellParams<IEquipmentDetail>) => (
      <img
        src={params.value}
        style={{ objectFit: "cover", height: "70px", objectPosition: "center" }}
      />
    ),
  },
  {
    field: "name",
    headerName: "Name",
    width: 200,
  },
  {
    field: "type",
    headerName: "Type",
    width: 100,
    renderCell: (params: GridRenderCellParams<IEquipmentDetail>) => (
      <TypeColumn categoryId={params.value} />
    ),
  },
  {
    field: "description",
    headerName: "Description",
    width: 300,
    valueGetter: (params: GridValueGetterParams) => {
      return `${params.value}`;
    },
  },
  {
    field: "ownerId",
    headerName: "Owner",
    width: 150,
    renderCell: (params: GridRenderCellParams<IEquipmentDetail>) => (
      <OwnerColumn userId={params.value} />
    ),
  },
];

export const requestTable: GridColDef[] = [
  {
    field: "requestEquipmentTypeId",
    headerName: "Type",
    width: 200,
    renderCell: (params: GridRenderCellParams<IEquipmentDetail>) => (
      <TypeColumn categoryId={params.value} />
    ),
  },
  { field: "description", headerName: "Description", width: 400 },
  {
    field: "userId",
    headerName: "User",
    width: 200,
    renderCell: (params: GridRenderCellParams<IEquipmentDetail>) => (
      <UserColumn userId={params.value} />
    ),
  },
  {
    field: "state",
    headerName: "State",
    width: 120,
    renderCell: (params: GridRenderCellParams<IEquipmentDetail>) => (
      <StateColum state={params.value} />
    ),
  },
  {
    field: "id",
    headerName: "",
    width: 50,
    renderCell: (params: GridRenderCellParams<TRequestEquipment>) => (
      <RequestActionColumn requestDetail={params.row} />
    ),
  },
];

export const userColumn: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    minWidth: 250,
    valueGetter: (params: GridValueGetterParams) => {
      const str = `${params.row.firstName} ${params.row.lastName}`;

      return str;
    },
  },
  { field: "address", headerName: "Address", minWidth: 220 },
  { field: "email", headerName: "Email", minWidth: 300 },
  {
    field: "id",
    headerName: "Equipments",
    minWidth: 200,
    renderCell: (params: GridRenderCellParams<IEquipmentDetail>) =>
      EquipmentColumn(params.value),
  },
];

export const historyColumn: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    minWidth: 250,
    valueGetter: (params: GridValueGetterParams) => {
      const str = `${params.row.firstName} ${params.row.lastName}`;

      return str;
    },
  },
  { field: "address", headerName: "Address", minWidth: 220 },
  { field: "email", headerName: "Email", minWidth: 300 },
];

export const categoryColumn: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    width: 300,
  },
  {
    field: "totalEquipment",
    headerName: "Total Equipments",
    width: 600,
    valueGetter: (params: GridValueGetterParams) => {
      return `${params.value} equipments`;
    },
  },
  {
    field: "a",
    headerName: "",
    width: 50,
    renderCell: (params: GridRenderCellParams<ICategory>) => (
      <ActionColumn categoryDetail={params.row} />
    ),
  },
];

interface ITableProps {
  rows?: any[];
  columns: GridColDef[];
  isLoading?: boolean;
  notCheckBoxSelection?: boolean;
  setSelection?: (selection: any[]) => void;
}

export default function Table({
  setSelection,
  rows,
  columns,
  isLoading,
  notCheckBoxSelection,
}: ITableProps) {
  return (
    <div style={{ height: 550, width: "100%", maxWidth: "100%" }}>
      <DataGrid
        rows={!isLoading ? rows || [] : []}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        onRowSelectionModelChange={(ids) => {
          const selectedRowsData = ids.map((id) =>
            rows?.find((row) => row.id === id)
          );
          setSelection?.(selectedRowsData);
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection={!notCheckBoxSelection}
        loading={isLoading}
      />
    </div>
  );
}
