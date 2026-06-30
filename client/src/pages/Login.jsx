import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import api from "../services/api";

import Background from "../components/Background";
import GlassCard from "../components/common/GlassCard";
import InputField from "../components/common/InputField";
import PrimaryButton from "../components/common/PrimaryButton";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "userId",
        res.data.user.id
      );

      localStorage.setItem(
        "username",
        res.data.user.username
      );

      navigate("/lobby");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div
      className="
      min-h-screen
      flex
      justify-center
      items-center
      px-5
      "
    >
      <Background />

      <div className="w-full max-w-md">
        <GlassCard>
          <h1
            className="
            text-5xl
            font-bold
            text-center
            mb-3
            "
          >
            LUDO ARENA
          </h1>

          <p
            className="
            text-center
            text-gray-400
            mb-8
            "
          >
            Real Time Multiplayer Gaming
          </p>

          <div className="space-y-4">
            <InputField
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <InputField
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />
          </div>

          <div className="mt-6">
            <PrimaryButton onClick={login}>
              Login
            </PrimaryButton>
          </div>

          <p
            className="
            text-center
            text-gray-400
            mt-6
            "
          >
            Don't have an account?

            <Link
              to="/signup"
              className="
              text-cyan-400
              ml-2
              "
            >
              Signup
            </Link>
          </p>
        </GlassCard>
      </div>
    </div>
  );
}

export default Login;