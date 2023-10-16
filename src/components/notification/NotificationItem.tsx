import React from "react";
import { INotification } from "../../interfaces/user-interfaces";
import "./NotificationItem.scss";
import { Avatar, Menu, MenuItem } from "@mui/material";
import * as routePath from "../../routes/paths";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getNotificationAction,
  readNotificationAction,
} from "../../stores/actions/notification-actions";
import useSelection from "antd/es/table/hooks/useSelection";
import { TRootState } from "../../stores/reducers";

interface IProps {
  notification: INotification;
  handleClose: () => void;
}

const NotificationItem = ({ notification, handleClose }: IProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const useData = useSelector((state: TRootState) => state.authUser.userData);

  const handleClickNotification = () => {
    handleClose();
    dispatch(
      readNotificationAction(notification.id, () => {
        useData && dispatch(getNotificationAction(useData.id));
        navigate(routePath.REQUEST_PAGE);
      })
    );
  };

  return (
    <MenuItem
      className={`NotificationItem ${
        !notification.read ? "NotificationItem__notRead" : ""
      }`}
      onClick={() => {
        handleClickNotification();
      }}
    >
      <div className="NotificationItem__icon">
        <Avatar
          alt="hqdat"
          src="/src/assets/img/avatar.png"
          sx={{ width: "32px", height: "32px" }}
        />
      </div>
      <div className="NotificationItem__info">
        <div className="NotificationItem__title">{notification.type}</div>
        <div className="NotificationItem__description">
          {notification.description}
        </div>
      </div>
    </MenuItem>
  );
};

export default NotificationItem;
