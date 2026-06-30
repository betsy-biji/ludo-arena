
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

import Background from "../components/Background";
import Navbar from "../components/Navbar";
import ActionCard from "../components/ActionCard";
import StatCard from "../components/common/StatCard";
import PrimaryButton from "../components/common/PrimaryButton";

function Lobby() {

  const navigate = useNavigate();

  const token =
    localStorage.getItem("token");

  const [roomCode, setRoomCode] =
    useState("");

  const [createdRoom, setCreatedRoom] =
    useState("");

  const createRoom = async () => {

    try {

      const res =
        await api.post(
          "/room/create",
          {},
          {
            headers: {
              authorization: token
            }
          }
        );

      setCreatedRoom(
        res.data.roomCode
      );

      localStorage.setItem(
        "roomCode",
        res.data.roomCode
      );

      alert(
        "Room Created Successfully!"
      );

      navigate("/room");

    }
    catch (err) {

      alert(
        err.response?.data?.message ||
        "Unable to create room."
      );

    }

  };

  const joinRoom = async () => {

    if (!roomCode) {

      alert("Enter Room Code");

      return;

    }

    try {

      await api.post(

        "/room/join",

        {
          roomCode
        },

        {
          headers: {
            authorization: token
          }
        }

      );

      localStorage.setItem(
        "roomCode",
        roomCode
      );

      navigate("/room");

    }
    catch (err) {

      alert(
        err.response?.data?.message ||
        "Unable to Join Room"
      );

    }

  };

  return (

<div
className="
min-h-screen
bg-slate-950
text-white
"
>

<Background/>

<Navbar/>

<div
className="
max-w-7xl
mx-auto
px-8
py-10
"
>

<div
className="
flex
justify-between
items-center
mb-10
"
>

<div>

<h1
className="
text-5xl
font-black
mb-3
"
>

Welcome Back 👋

</h1>

<p
className="
text-gray-400
text-lg
"
>

Create a room or join your friends.

</p>

</div>

</div>

<div
className="
grid
lg:grid-cols-3
gap-6
mb-10
"
>

<StatCard

title="Players Online"

value="128"

color="text-cyan-400"

/>

<StatCard

title="Rooms Active"

value="34"

color="text-green-400"

/>

<StatCard

title="Current Version"

value="v1.0"

color="text-purple-400"

/>

</div>

<div
className="
grid
lg:grid-cols-2
gap-8
"
>

<ActionCard

icon="🎲"

title="Create Match"

description="Create a private multiplayer room."

>

<PrimaryButton

onClick={createRoom}

>

Create Room

</PrimaryButton>

{

createdRoom &&

<div
className="
mt-6
bg-slate-900
rounded-xl
p-4
"
>

<p
className="
text-gray-400
"
>

Room Code

</p>

<h2
className="
text-4xl
font-black
mt-2
tracking-widest
"
>

{createdRoom}

</h2>

</div>

}

</ActionCard>

<ActionCard

icon="🚀"

title="Join Match"

description="Join your friend's room."

>

<input

value={roomCode}

onChange={(e)=>

setRoomCode(

e.target.value.toUpperCase()

)

}

placeholder="Enter Room Code"

className="

w-full

bg-slate-900

border

border-white/10

rounded-xl

p-4

mb-6

outline-none

"

 />

<PrimaryButton

onClick={joinRoom}

>

Join Room

</PrimaryButton>

</ActionCard>

</div>

</div>

</div>

  );

}

export default Lobby;