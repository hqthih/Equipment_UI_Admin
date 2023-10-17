import { IUserDetail } from "./../../interfaces/user-interfaces";
import { IEquipmentDetail } from "../../interfaces/equipment-interface";
import { EEquipmentActions } from "../actions/equipment-actions/constants";

type TEquipmentState = {
  equipments: IEquipmentDetail[];
  historyTableData: IUserDetail[];
  pageNo?: number;
  pageSize?: number;
  totalElements?: number;
  totalPages?: number;
  last?: boolean;
};

const initialState: TEquipmentState = {
  equipments: [],
  historyTableData: [],
};

const equipmentReducer = (
  state = initialState,
  action: { type: string; payload: any }
): TEquipmentState => {
  switch (action.type) {
    case EEquipmentActions.GET_EQUIPMENT_SUCCESS:
      return {
        ...state,
        equipments: action.payload.content || action.payload,
        pageNo: action.payload.pageNo,
        pageSize: action.payload.pageSize,
        totalElements: action.payload.totalElements,
        totalPages: action.payload.totalPages,
        last: action.payload.last,
      };
    case EEquipmentActions.HISTORY_TRANSFER_EQUIPMENT:
      return {
        ...state,
        historyTableData: action.payload,
      };
    default:
      return state;
  }
};

export default equipmentReducer;
