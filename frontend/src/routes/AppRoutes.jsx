import { Switch, Route } from "react-router-dom";
import Login from "../pages/Login";
import ForgotPassword from "../components/ForgotPassword";
import ResetPassword from "../components/ResetPassword";

export default function AppRoutes() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/forgot-password" component={ForgotPassword} />
      <Route exact path="/reset-password/:token" component={ResetPassword} />
    </Switch>
  );
}