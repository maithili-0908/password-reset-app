import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import ForgotPassword from "../components/ForgotPassword";
import ResetPassword from "../components/ResetPassword";

const AppRoutes = () => {
  return (
    <Switch>
      <Route exact path="/forgot-password" component={ForgotPassword} />
      <Route exact path="/reset-password/:token" component={ResetPassword} />
      <Redirect to="/forgot-password" />
    </Switch>
  );
};

export default AppRoutes;