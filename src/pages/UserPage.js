import React from "react";
import { useParams } from "react-router-dom";
import UserContainer from "../components/UserContainer";

const UserPage = () => {
  const { id } = useParams();
  return <UserContainer id={id} />;
};

export default UserPage;
