import { Redirect } from "expo-router";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Logout() {
  const { logout } = useContext(AuthContext);

  // Auto logout on screen load
  useEffect(() => {
    logout();
  }, []);

  return <Redirect href="/sign-in" />;
}
