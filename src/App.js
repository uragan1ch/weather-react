import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignIn } from "./pages/auth/sign-in/sign_in";
import { SignUp } from "./pages/auth/sign-up/sign_up";
import { Home } from "./pages/home/home";
import { ProtectedRoute } from "./components/Routes/protection-route";
import { ChangeProfile } from "./pages/ChangeProfile/ChangeProfile";
import { useUserStore } from "./components/global-user/globalUser";
import { use, useEffect } from "react";
import { useCityStore } from "./components/global-cities/global-cities";

export function useCityInit() {
  const { setCities } = useCityStore();
  const { user } = useUserStore();

  useEffect(() => {
    if (user) {
      setCities(user.favoriteCities || [], user.mainCity || "");
    }
  }, [user]);
}

export function App() {
  useEffect(() => {
    useUserStore.getState().fetchUser();
  }, []);

  useCityInit();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/sign_in" replace />} />
        <Route path="/sign_in" element={<SignIn />} />
        <Route path="/sign_up" element={<SignUp />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/change_profile" element={<ChangeProfile />} />
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// redux, zustand
// in home => sign_in protected route
