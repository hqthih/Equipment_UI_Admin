import React from "react";
import { Menu, MenuItem } from "@mui/material";
import { INotification } from "../../interfaces/user-interfaces";
import NotificationItem from "./NotificationItem";
import "./Notification.scss";
import { useNavigate } from "react-router-dom";
import * as routePath from "../../routes/paths";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAllNotificationAction,
  getNotificationAction,
  readAllNotificationAction,
} from "../../stores/actions/notification-actions";
import { TRootState } from "../../stores/reducers";

interface IProps {
  anchorEl: null | HTMLElement;
  handleClose: () => void;
  notifications: INotification[];
}

const Notification = ({ anchorEl, handleClose, notifications }: IProps) => {
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const userData = useSelector((state: TRootState) => state.authUser.userData);

  const handleGetNotification = () => {
    userData && dispatch(getNotificationAction(userData?.id));
  };

  const handleClearAll = () => {
    handleClose();
    userData &&
      dispatch(clearAllNotificationAction(userData?.id, handleGetNotification));
  };

  const handleReadAll = () => {
    handleClose();
    userData &&
      dispatch(readAllNotificationAction(userData?.id, handleGetNotification));
  };

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      style={{ right: "100px" }}
    >
      <div className="Notifications">
        {notifications.length && (
          <div className="Notifications__actions">
            <div className="Notifications__clear">
              <a href="#" onClick={handleClearAll} aria-disabled>
                Clear all
              </a>
            </div>
            <div className="Notifications__readAll">
              <a href="#" onClick={handleReadAll}>
                Read all
              </a>
            </div>
          </div>
        )}
        {notifications.length ? (
          notifications.map((noti: INotification) => (
            <div>
              <NotificationItem notification={noti} handleClose={handleClose} />
            </div>
          ))
        ) : (
          <div
            style={{
              minWidth: "310px",
              minHeight: "200px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Empty
          </div>
        )}
      </div>
    </Menu>
  );
};

export default Notification;
