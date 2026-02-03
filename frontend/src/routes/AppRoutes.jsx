import { BrowserRouter, Route } from "react-router-dom";
import ForgotPassword from "../components/ForgotPassword";
import ResetPassword from "../components/ResetPassword";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Route exact path="/forgot-password" component={ForgotPassword} />
      <Route path="/reset-password/:token" component={ResetPassword} />
    </BrowserRouter>
  );
}