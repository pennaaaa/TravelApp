import React from "react";

const AuthContext = React.createContext({
  isLoading: true,
  userName: null,
  userToken: null,
  userEmail: null,
  userId: null,
  gender: null,
  phone: null,
});

export default AuthContext;
