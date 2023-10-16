import AssignmentIcon from "@mui/icons-material/Assignment";
import BuildIcon from "@mui/icons-material/Build";
import CategoryIcon from "@mui/icons-material/Category";
import PersonIcon from "@mui/icons-material/Person";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as routePath from "../routes/paths";
import { TRootState } from "../stores/reducers";
import "./SideBar.scss";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((state: TRootState) => state.authUser.userData);

  const adminTabs = [
    {
      label: (
        <div
          className={`Sidebar__item-wrapper ${
            location.pathname === routePath.USER && "Sidebar__item-active"
          }`}
        >
          <PersonIcon /> User
        </div>
      ),
      route: routePath.USER,
    },
    {
      label: (
        <div
          className={`Sidebar__item-wrapper ${
            location.pathname === routePath.EQUIPMENT && "Sidebar__item-active"
          }`}
        >
          <BuildIcon /> Equipment
        </div>
      ),
      route: routePath.EQUIPMENT,
    },
    {
      label: (
        <div
          className={`Sidebar__item-wrapper ${
            location.pathname === routePath.CATEGORY && "Sidebar__item-active"
          }`}
        >
          <CategoryIcon /> Category
        </div>
      ),
      route: routePath.CATEGORY,
    },
    {
      label: (
        <div
          className={`Sidebar__item-wrapper ${
            location.pathname === routePath.REQUEST_PAGE &&
            "Sidebar__item-active"
          }`}
        >
          <AssignmentIcon /> Request
        </div>
      ),
      route: routePath.REQUEST_PAGE,
    },
  ];

  const renderSidebarItem = (
    data: { label: JSX.Element; route: string },
    key: number
  ) => {
    const { label, route } = data;

    return (
      <div
        key={key}
        onClick={() => navigate(route, { replace: true })}
        className="Sidebar__item"
      >
        {label}
      </div>
    );
  };
  return (
    <div className="Sidebar">
      <div className="Sidebar__user">
        <div className="Sidebar__avt">
          <Avatar
            alt="hqdat"
            src="/src/assets/img/avatar.png"
            sx={{ width: "64px", height: "64px" }}
          />
        </div>
        <div className="Sidebar__name">
          {userData?.firstName} {userData?.lastName}
        </div>
        <div className="Sidebar__role">{userData?.role.name}</div>
      </div>
      <div className="divider"></div>
      {adminTabs.map((tab, key) => renderSidebarItem(tab, key))}
    </div>
  );
};

export default Sidebar;
