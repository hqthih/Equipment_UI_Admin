import { combineReducers } from "redux";
import userReducer from "./user-reducer";
import loadingReducer from "./loading-reducer";
import equipmentReducer from "./equipment-reducer";
import authReducer from "./auth-reducers";
import categoryReducer from "./category-reducers";
import requestReducer from "./request-reducers";
import notificationReducer from "./notification-reducer";

const rootReducer = combineReducers({
  user: userReducer,
  loading: loadingReducer,
  equipment: equipmentReducer,
  categoryReducer: categoryReducer,
  authUser: authReducer,
  requestReducer: requestReducer,
  notificationReducer: notificationReducer,
});

export type TRootState = ReturnType<typeof rootReducer>;

export default rootReducer;
