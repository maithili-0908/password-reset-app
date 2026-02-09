import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Login from "../pages/Login";
import ForgotPassword from "../components/ForgotPassword";
import ResetPassword from "../components/ResetPassword";

const AppRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/login" component={Login} />

      <Route exact path="/forgot-password" component={ForgotPassword} />
      <Route exact path="/reset-password/:token" component={ResetPassword} />

      <Redirect to="/login" />
    </Switch>
  );
};

export default AppRoutes;