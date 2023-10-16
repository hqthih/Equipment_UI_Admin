import { TRequestEquipment } from "../../interfaces/equipment-interface";
import { ERequestActions } from "../actions/request-actions/constants";

type TRequestEquipmentState = {
  requests: TRequestEquipment[];
};

const initialState: TRequestEquipmentState = {
  requests: [],
};

const requestReducer = (
  state = initialState,
  action: { type: string; payload: any }
): TRequestEquipmentState => {
  switch (action.type) {
    case ERequestActions.GET_REQUEST_EQUIPMENT_SUCCESS:
      return {
        ...state,
        requests: action.payload,
      };
    default:
      return state;
  }
};

export default requestReducer;
