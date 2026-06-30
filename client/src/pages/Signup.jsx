import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";

import Background from "../components/Background";
import GlassCard from "../components/common/GlassCard";
import InputField from "../components/common/InputField";
import PrimaryButton from "../components/common/PrimaryButton";

function Signup() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const signup = async () => {

    if (!username || !email || !password) {

      alert("Please fill all fields");

      return;

    }

    try {

      await api.post(
        "/auth/signup",
        {
          username,
          email,
          password
        }
      );

      alert("Account Created Successfully");

      navigate("/login");

    }
    catch (err) {

      alert(
        err.response?.data?.message ||
        "Signup Failed"
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

            Create Your Account

          </p>

          <div className="space-y-4">

            <InputField
              placeholder="Username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
            />

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

            <PrimaryButton
              onClick={signup}
            >

              Create Account

            </PrimaryButton>

          </div>

          <p
            className="
            text-center
            text-gray-400
            mt-6
            "
          >

            Already have an account?

            <Link
              to="/login"
              className="
              text-cyan-400
              ml-2
              hover:text-cyan-300
              "
            >

              Login

            </Link>

          </p>

        </GlassCard>

      </div>

    </div>

  );

}

export default Signup;