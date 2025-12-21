import { Route, Routes } from "react-router-dom";
import Home from "./routes/home";
import { Login } from "./routes/login";
import { Projects } from "./routes/projects";
import { AuthProvider } from "./auth/authContext";
import { ProtectedRoute } from "./auth/protectedRoute";
import { Toaster } from "sonner";
import { Tasks } from "./routes/tasks";

export function App() {
  return (
    <AuthProvider>
      <Toaster />
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
        <Route
          path="/projects/:id/tasks"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
