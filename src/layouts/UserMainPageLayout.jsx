import React from "react";
import Aux from "../hoc/Aux";
import NavbarUser from "../components/NavbarUser/NavbarUser";
import UserMainPage from "../containers/UserMainPage/UserMainPage";

const UserMainPageLayout = () => {
  return (
    <Aux>
      <NavbarUser />
      <UserMainPage />
    </Aux>
  );
};

export default UserMainPageLayout;
