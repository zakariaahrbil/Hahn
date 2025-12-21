import { Route, Routes } from "react-router-dom";
import Home from "./routes/home";
import { Login } from "./routes/login";
import { Projects } from "./routes/projects";
import { AuthProvider } from "./auth/authContext";
import { ProtectedRoute } from "./auth/protectedRoute";

export function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          }
        />
        <Route path="/tasks" element={<button>tasks</button>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
