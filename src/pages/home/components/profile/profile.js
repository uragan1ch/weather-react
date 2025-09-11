import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../../../components/global-user/globalUser";
import("../../../../styles/styles-home/profile.css");
import("../../../../styles/styles-home/buttons-header.css");

export const Profile = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();

  const goToChangeProfile = () => {
    navigate("/change_profile");
  };

  return (
    <div className="profile">
      Твой никнейм:<br></br> {user?.displayName}
      <button className="header_buttons" onClick={goToChangeProfile}>
        Сменить никнейм
      </button>
    </div>
  );
};
