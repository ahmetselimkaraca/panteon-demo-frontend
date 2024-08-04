import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/api";
import { Input, Button, Card, CardBody, CardHeader } from "@nextui-org/react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []); // Removed navigate from dependency array

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ username, password });
      localStorage.setItem("token", response.data);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <Card
        style={{ padding: "24px", height: "64vh", width: "48vh" }}
        className="flex items-center justify-center"
      >
        <h2 className="text-lg pb-8">Login</h2>

        <form className="flex gap-3 flex-col" onSubmit={handleSubmit}>
          <Input
            type="text"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            clearable
            bordered
          />

          <Input
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            clearable
            bordered
          />

          <Button type="submit" fullWidth color="primary">
            Login
          </Button>
          <p className="mt-4 text-center">
            {`Don't have an account? `}
            <Link to="/register" className="text-blue-500 hover:underline">
              Create Account
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
}

export default Login;
