// import { createContext, useContext, useState } from 'react';

// export const AuthContext = createContext({});

// export function AuthContextProvider({ children }) {
//   const [auth, setAuth] = useState(false)
//   let sharedState = {
//     isAuth: auth,
//     setAuth: (currentUser) => setAuth(!!currentUser)
//   }

//   return (
//     <AuthContext.Provider value={sharedState}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuthContext() {
//   return useContext(AuthContext);
// }

import { createContext, Dispatch, SetStateAction, useState } from "react";

export type CurrentUser = { email: string, id: string }

type AuthContextState = {
  isAuth?: boolean,
  currentUser?: CurrentUser,
  setAuth?: Dispatch<SetStateAction<Partial<AuthContextState>>>
};

const contextDefaultValues: AuthContextState = {
  isAuth: false,
  currentUser: null,
};

export const AuthContext = createContext<AuthContextState>(
  contextDefaultValues
);

const AuthProvider = ({ children }) => {
  const [auth, setAuthentication] = useState<Partial<AuthContextState>>({ isAuth: false, currentUser: null });

  const callback = (currentUser: CurrentUser) => {
    setAuthentication(({ isAuth: !!currentUser, currentUser }))
  }

  const value = {
    isAuth: auth?.isAuth,
    currentUser: auth?.currentUser,
    setAuth: setAuthentication
  }

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;