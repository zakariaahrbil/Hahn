import { api } from "@/api/clients";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

export type loginResponseType = {
  token: string;
};

export type userType = {
  id: string | null;
  username: string | null;
  email: string | null;
};

export type loginPayloadType = {
  email: string;
  password: string;
};

export type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (loginPayload: loginPayloadType) => Promise<loginResponseType>;
  logout: () => void;
  user: userType | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<userType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    //TODO: check token validity
    if(token){
        setIsAuthenticated(true)
    }
    }, []);

  const login = async (
    loginPayload: loginPayloadType
  ): Promise<loginResponseType> => {
    try {
      setIsLoading(true);
      console.log("Logging in with", loginPayload);
      const response = await api.post("/auth/login", loginPayload);
      setIsAuthenticated(true);
      setUser({
        id:response.data.user?.id,
        username:response.data.user?.username,
        email:response.data.user?.email
      });
      localStorage.setItem("token", response.data.token);
      navigate("/projects");
      return response.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || "Login failed");
    }finally {
        setIsLoading(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth= ()=>{
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}