import React from "react";
import { useSelector } from "react-redux";
import { TRootState } from "../../../stores/reducers";

interface IUserColumnProps {
  userId: number;
}

const UserColumn = ({ userId }: IUserColumnProps) => {
  const userDetail = useSelector((state: TRootState) => state.user.users).find(
    (user) => user.id === userId
  );

  return <div>{`${userDetail?.lastName} ${userDetail?.firstName}`}</div>;
};

export default UserColumn;
