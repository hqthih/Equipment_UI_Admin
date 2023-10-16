import { INotification } from "../../interfaces/user-interfaces";
import { ENotificationActions } from "../actions/notification-actions/constants";

type TNotificationState = {
  notifications: INotification[];
};

const initialState: TNotificationState = {
  notifications: [],
};

const notificationReducer = (
  state = initialState,
  action: { type: string; payload: any }
): TNotificationState => {
  switch (action.type) {
    case ENotificationActions.GET_NOTIFICATION_SUCCESS:
      return {
        ...state,
        notifications: action.payload,
      };
    default:
      return state;
  }
};

export default notificationReducer;
