import React, { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import * as RoutePaths from "./paths";
import { useSelector } from "react-redux";
import { TRootState } from "../stores/reducers";

const SignIn = React.lazy(() => import("../pages/auth/SignIn"));
const HomePage = React.lazy(() => import("../pages/homepage/HomePage"));
const UserPage = React.lazy(() => import("../pages/user/UserPage"));
const EquipmentPage = React.lazy(() => import("../pages/equipment/Equipment"));
const RequestPage = React.lazy(() => import("../pages/request/RequestPage"));
const CategoryPage = React.lazy(() => import("../pages/category/CategoryPage"));

const Routes = () => {
  const adminRouter = createBrowserRouter([
    {
      element: <SignIn />,
      path: "*",
    },
    {
      element: <SignIn />,
      path: RoutePaths.SIGNIN,
    },
    {
      element: <HomePage />,
      children: [
        { path: RoutePaths.EQUIPMENT, element: <EquipmentPage /> },
        { path: RoutePaths.USER, element: <UserPage /> },
        { path: RoutePaths.REQUEST_PAGE, element: <RequestPage /> },
        { path: RoutePaths.CATEGORY, element: <CategoryPage /> },
      ],
    },
  ]);

  return (
    <React.StrictMode>
      <Suspense>
        <RouterProvider router={adminRouter} />
      </Suspense>
    </React.StrictMode>
  );
};

export default Routes;
