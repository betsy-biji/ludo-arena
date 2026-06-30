import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useLobbySocket from "../hooks/useLobbySocket";
import api from "../services/api";

import LobbyHeader from "../components/lobby/LobbyHeader";
import LobbyBoardPreview from "../components/lobby/LobbyBoardPreview";
import MatchInfo from "../components/lobby/MatchInfo";
import PlayerCard from "../components/common/PlayerCard";

import GlassCard from "../components/common/GlassCard";
import PrimaryButton from "../components/common/PrimaryButton";

function WaitingRoom() {
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  const roomCode = localStorage.getItem("roomCode");
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const userId = localStorage.getItem("userId");

  const user = {
    userId,
    username,
  };

  const fetchRoom = async () => {
    try {
      const res = await api.post(
        "/room/details",
        {
          roomCode,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );

      setRoom(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoom();
  }, []);

  const { startGame } = useLobbySocket({
    room,
    setRoom,
    roomCode,
    user,
  });

  const copyRoomCode = async () => {
    if (!room) return;

    try {
      await navigator.clipboard.writeText(room.roomCode);
      alert("Room code copied.");
    } catch (err) {
      console.error(err);
      alert("Unable to copy room code.");
    }
  };

  const leaveLobby = () => {
    localStorage.removeItem("roomCode");
    navigate("/lobby");
  };

  if (loading || !room) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />

          <h1 className="text-3xl font-bold text-white">
            Connecting...
          </h1>

          <p className="text-slate-400 mt-3">
            Joining Multiplayer Lobby
          </p>
        </div>
      </div>
    );
  }

  const isHost =
    room.players.length > 0 &&
    room.players[0].username === username;

  const canStart = room.players.length >= 2;

  const emptySlots = Math.max(
    0,
    4 - room.players.length
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">

      <LobbyHeader
        roomCode={room.roomCode}
        playerCount={room.players.length}
        onCopy={copyRoomCode}
        onLeave={leaveLobby}
      />

      <div className="max-w-7xl mx-auto px-8 py-8">

        <div className="grid lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2">
            <LobbyBoardPreview />
          </div>

          <div>
            <MatchInfo
              room={room}
              isHost={isHost}
            />
          </div>

        </div>

        {/* ================= PLAYERS SECTION START ================= */}
                <div className="mt-8">

          <GlassCard>

            <div className="flex items-center justify-between mb-8">

              <div>

                <h2 className="text-3xl font-bold text-white">
                  Players
                </h2>

                <p className="text-slate-400 mt-2">
                  Waiting for everyone to join...
                </p>

              </div>

              <div className="text-right">

                <p className="text-slate-500 text-sm">
                  CONNECTED
                </p>

                <h2 className="text-4xl font-black text-cyan-400">
                  {room.players.length}/4
                </h2>

              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-6">

              {room.players.map((player, index) => (

                <PlayerCard
                  key={player.userId}
                  player={player}
                  isHost={index === 0}
                />

              ))}

              {Array.from({
                length: emptySlots,
              }).map((_, index) => (

                <div
                  key={index}
                  className="
                    border-2
                    border-dashed
                    border-slate-700
                    rounded-2xl
                    h-44
                    flex
                    flex-col
                    items-center
                    justify-center
                    text-slate-500
                  "
                >

                  <div className="text-5xl mb-3">
                    +
                  </div>

                  <h3 className="font-semibold">
                    Waiting for Player
                  </h3>

                  <p className="text-sm mt-2">
                    Share your room code
                  </p>

                </div>

              ))}

            </div>

            <div className="mt-10">

              {isHost ? (

                <PrimaryButton
                  onClick={() => {
                    if (!canStart) {
                      alert(
                        "At least 2 players are required to start the match."
                      );
                      return;
                    }

                    startGame();
                  }}
                >
                  {canStart
                    ? "START MATCH"
                    : "WAITING FOR PLAYERS"}
                </PrimaryButton>

              ) : (

                <div
                  className="
                    h-16
                    rounded-xl
                    bg-slate-800
                    border
                    border-slate-700
                    flex
                    items-center
                    justify-center
                    text-slate-300
                    text-lg
                    font-semibold
                  "
                >

                  Waiting for Host to Start the Match...

                </div>

              )}

            </div>

          </GlassCard>

        </div>

        {/* ================= INFO CARDS START ================= */}
                <div
          className="
            mt-8
            grid
            lg:grid-cols-3
            gap-6
          "
        >

          <GlassCard>

            <h3 className="text-xl font-bold text-white mb-4">
              Match Information
            </h3>

            <div className="space-y-3 text-slate-300">

              <div className="flex justify-between">
                <span>Game Mode</span>
                <span>Classic</span>
              </div>

              <div className="flex justify-between">
                <span>Minimum Players</span>
                <span>2</span>
              </div>

              <div className="flex justify-between">
                <span>Maximum Players</span>
                <span>4</span>
              </div>

              <div className="flex justify-between">
                <span>Status</span>

                <span className="text-green-400">
                  Waiting
                </span>
              </div>

            </div>

          </GlassCard>

          <GlassCard>

            <h3 className="text-xl font-bold text-white mb-4">
              Invite Friends
            </h3>

            <p className="text-slate-400 mb-5">
              Share this room code with your friends.
            </p>

            <div
              className="
                bg-slate-900
                rounded-xl
                p-4
                text-center
                text-3xl
                font-black
                tracking-[0.3em]
                text-cyan-400
              "
            >
              {room.roomCode}
            </div>

          </GlassCard>

          <GlassCard>

            <h3 className="text-xl font-bold text-white mb-4">
              Lobby Tips
            </h3>

            <ul className="space-y-3 text-slate-400">

              <li>• Minimum 2 players required.</li>

              <li>• Host controls game start.</li>

              <li>
                • Lobby updates happen in real time using Socket.io.
              </li>

              <li>
                • Dice, turns and animations arrive in Step 4.
              </li>

            </ul>

          </GlassCard>

        </div>

      </div>

    </div>
  );
}

export default WaitingRoom;