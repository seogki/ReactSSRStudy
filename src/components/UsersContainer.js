import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../modules/users";
import Users from "./Users";
import { Preloader } from "../lib/PreloadContext";

const UsersContainer = () => {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  useEffect(() => {
    if (users) return;
    dispatch(getUsers());
  }, [dispatch, users]);

  return (
    <>
      <Users users={users} />
      <Preloader resolve={() => dispatch(getUsers)} />
    </>
  );
};

export default UsersContainer;
