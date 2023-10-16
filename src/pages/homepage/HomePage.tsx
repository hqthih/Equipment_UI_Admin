import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../../containers/SideBar";
import "./HomePage.scss";
import * as RoutePaths from "../../routes/paths";
import { EAuthToken } from "../../interfaces/user-interfaces";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { Avatar, Menu, MenuItem } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useDispatch, useSelector } from "react-redux";
import { toastInfo } from "../../utils/notifications-utils";
import { TRootState } from "../../stores/reducers";
import { requestPermission } from "../../firebase/firebase-app";
import { getRequestEquipmentAction } from "../../stores/actions/request-actions";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import Badge from "@mui/material/Badge";
import Notification from "../../components/notification/Notification";
import { getNotificationAction } from "../../stores/actions/notification-actions";

const HomePage = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state: TRootState) => state.authUser.userData);
  const notifications = useSelector(
    (state: TRootState) => state.notificationReducer.notifications
  );

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [anchorElNoti, setAnchorElNoti] = useState<null | HTMLElement>(null);
  const openNotification = Boolean(anchorElNoti);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseNotification = () => {
    setAnchorElNoti(null);
  };

  const handleFeatureNotAvailable = () => {
    toastInfo("This feature will be available in the future");
    handleClose();
  };

  const handleClickNotificationIcon = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    setAnchorElNoti(event.currentTarget);
  };

  const handleClickUser = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    localStorage.removeItem(EAuthToken.ACCESS_TOKEN);
    localStorage.removeItem(EAuthToken.REFRESH_TOKEN);
    localStorage.removeItem("persist:root");
    handleClose();
    window.location.href = RoutePaths.SIGNIN;
  };

  const handleEventWhenHaveNoti = () => {
    console.log("dispatch get request");
    userData && dispatch(getNotificationAction(userData.id));
  };

  const handleGetNotification = () => {
    userData && dispatch(getNotificationAction(userData.id));
  };

  useEffect(() => {
    requestPermission(handleEventWhenHaveNoti);
    handleGetNotification();
  }, []);

  if (!localStorage.getItem(EAuthToken.ACCESS_TOKEN)) {
    return <Navigate to={RoutePaths.SIGNIN} replace />;
  }
  return (
    <div className="HomePage">
      <div className="HomePage__sidebar">
        <Sidebar />
      </div>
      <div className="HomePage__outlet">
        <div className="HomePage__outlet-actions">
          <div style={{ display: "flex", gap: "8px" }}>
            <div
              className="HomePage__notification-icon"
              onClick={(e) => handleClickNotificationIcon(e)}
            >
              <Badge
                badgeContent={notifications.filter((noti) => !noti.read).length}
                color="primary"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <NotificationsRoundedIcon
                  sx={{ width: "32px", height: "32px" }}
                />
              </Badge>
            </div>
            <div
              className="HomePage__outlet-user"
              onClick={(e) => handleClickUser(e)}
            >
              <Avatar
                alt="hqdat"
                src="/src/assets/img/avatar.png"
                sx={{ width: "32px", height: "32px" }}
              />
              <div className="HomePage__outlet-user-name">
                {userData?.firstName} {userData?.lastName}
                <KeyboardArrowDownRoundedIcon />
              </div>
            </div>
            <Notification
              anchorEl={anchorElNoti}
              handleClose={handleCloseNotification}
              notifications={notifications}
            />
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              style={{ right: "28px" }}
            >
              <MenuItem
                onClick={handleFeatureNotAvailable}
                className="Navbar__menu-item"
              >
                <PersonOutlineOutlinedIcon /> My account
              </MenuItem>
              <MenuItem
                onClick={handleFeatureNotAvailable}
                className="Navbar__menu-item"
              >
                <SettingsIcon /> Settings
              </MenuItem>
              <MenuItem onClick={handleLogout} className="Navbar__menu-item">
                <LogoutIcon />
                Logout
              </MenuItem>
            </Menu>
          </div>
        </div>
        <div className="HomePage__outlet-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
