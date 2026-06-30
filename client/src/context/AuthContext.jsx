import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const userId = localStorage.getItem("userId");

    if (token && username && userId) {
      setUser({
        token,
        username,
        userId,
      });
    }
  }, []);

  const login = ({ token, username, userId }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("userId", userId);

    setUser({
      token,
      username,
      userId,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    localStorage.removeItem("roomCode");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}