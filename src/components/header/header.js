import { useNavigate } from "react-router-dom";
import("../../styles/styles-home/buttons-header.css");

export function Header() {
  const navigate = useNavigate();
  const goToSignIn = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/sign_in");
  };

  return (
    <button className="header_buttons" onClick={goToSignIn}>
      Выйти
    </button>
  );
}
