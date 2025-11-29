import { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { Button, Box } from "@mui/material";

const PrivateRoute = ({ children }) => {
  const { token } = useContext(AuthContext);
  return token ? children : <Navigate to="/login" />;
};

export default function App() {
  const { token } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route
        path="*"
        element={
          <Box textAlign="center" mt={5}>
            <h1>404 Not Found</h1>
            <Button component={Link} to={token ? "/" : "/login"} variant="contained">
              Go Home
            </Button>
          </Box>
        }
      />
    </Routes>
  );
}

