import { Switch, Route } from "react-router-dom";
import ForgotPassword from "../components/ForgotPassword";
import ResetPassword from "../components/ResetPassword";
import Login from "../pages/Login";

export default function AppRoutes() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/forgot-password" component={ForgotPassword} />
      <Route exact path="/reset-password/:token" component={ResetPassword} />
    </Switch>
  );
}