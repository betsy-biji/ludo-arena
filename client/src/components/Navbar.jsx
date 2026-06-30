import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.clear();

    navigate("/login");

  };

  return (

    <nav
      className="
      w-full
      h-20
      px-10
      flex
      justify-between
      items-center

      bg-white/5
      backdrop-blur-xl

      border-b
      border-white/10

      sticky
      top-0

      z-50
      "
    >

      <div>

        <h1
          className="
          text-3xl
          font-black

          bg-gradient-to-r
          from-cyan-400
          via-purple-500
          to-pink-500

          bg-clip-text
          text-transparent
          "
        >

          🎮 LUDO ARENA

        </h1>

      </div>

      <div
      className="
      flex
      items-center
      gap-5
      "
      >

        <div
        className="
        flex
        items-center
        gap-3
        "
        >

          <div
          className="
          w-3
          h-3
          rounded-full
          bg-green-500
          animate-pulse
          "
          />

          <span
          className="
          text-gray-300
          font-medium
          "
          >

            Online

          </span>

        </div>

        <button

          onClick={logout}

          className="
          px-5
          py-2

          rounded-xl

          bg-red-500/20

          border
          border-red-500/40

          hover:bg-red-500

          transition-all

          duration-300
          "

        >

          Logout

        </button>

      </div>

    </nav>

  );

}

export default Navbar;