import React, { useEffect, useState, createContext } from "react";
export const AuthContext = createContext({
  fetching: false,
  authenticated: false,
  user: null,
  token: null,
  message: "",
  loginUser: () => {},
  logoutUser: () => {},
});

export function AuthWrapper({ children }) {
  const [fetching, setFetching] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [message, setMessage] = useState("");

  // Using useEffect since I can't use localStorage until window loads
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user") || null));
    setToken(JSON.parse(localStorage.getItem("token") || null));
    setFetching(false);
  }, []);

  // authenticated might be a useless variable, set here for simplicity.
  useEffect(() => {
    setAuthenticated(!!user);
  }, [user]);

  const loginUser = async (username, password) => {
    setFetching(true);
    let login;
    try {
      const url = new URL("/users/login", process.env.NEXT_PUBLIC_API_URL);
      const request = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      login = await request.json();
    } catch (e) {
      setMessage(e.message);
    }
    if (!login.user || !login.token) {
      setMessage(login.error);
    }
    if (login.user && login.token) {
      setMessage("");
      setToken(login.token);
      localStorage.setItem("token", JSON.stringify(login.token));
      setUser(login.user);
      localStorage.setItem("user", JSON.stringify(login.user));
    }
    setFetching(false);
  };

  const logoutUser = async () => {
    localStorage.removeItem("token");
    setToken(null);
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        fetching,
        authenticated,
        user,
        message,
        token,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
