function LobbyBoardPreview() {
  const colors = [
    {
      name: "Red",
      bg: "bg-red-500",
      text: "text-red-400",
    },
    {
      name: "Green",
      bg: "bg-green-500",
      text: "text-green-400",
    },
    {
      name: "Yellow",
      bg: "bg-yellow-400",
      text: "text-yellow-300",
    },
    {
      name: "Blue",
      bg: "bg-blue-500",
      text: "text-blue-400",
    },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 h-full flex flex-col">

      <div className="mb-6">

        <h2 className="text-2xl font-bold text-white">
          Board Preview
        </h2>

        <p className="text-slate-400 mt-1">
          Match will begin once the host starts the game.
        </p>

      </div>

      <div className="flex-1 flex items-center justify-center">

        <div className="relative w-[420px] h-[420px] rounded-3xl bg-slate-950 border border-slate-700 shadow-2xl">

          {/* Center */}

          <div className="absolute inset-0 flex items-center justify-center">

            <div className="w-24 h-24 rounded-full bg-slate-900 border-4 border-indigo-500 flex items-center justify-center">

              <span className="text-3xl">
                🎲
              </span>

            </div>

          </div>

          {/* Corners */}

          <div className="absolute top-5 left-5 w-28 h-28 rounded-2xl bg-red-500/20 border border-red-500 flex items-center justify-center">

            <div className="grid grid-cols-2 gap-2">

              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="w-5 h-5 rounded-full bg-red-500 animate-pulse"
                />
              ))}

            </div>

          </div>

          <div className="absolute top-5 right-5 w-28 h-28 rounded-2xl bg-green-500/20 border border-green-500 flex items-center justify-center">

            <div className="grid grid-cols-2 gap-2">

              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="w-5 h-5 rounded-full bg-green-500 animate-pulse"
                />
              ))}

            </div>

          </div>

          <div className="absolute bottom-5 left-5 w-28 h-28 rounded-2xl bg-yellow-400/20 border border-yellow-400 flex items-center justify-center">

            <div className="grid grid-cols-2 gap-2">

              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="w-5 h-5 rounded-full bg-yellow-400 animate-pulse"
                />
              ))}

            </div>

          </div>

          <div className="absolute bottom-5 right-5 w-28 h-28 rounded-2xl bg-blue-500/20 border border-blue-500 flex items-center justify-center">

            <div className="grid grid-cols-2 gap-2">

              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="w-5 h-5 rounded-full bg-blue-500 animate-pulse"
                />
              ))}

            </div>

          </div>

          {/* Cross */}

          <div className="absolute top-1/2 left-0 right-0 h-2 bg-slate-700 -translate-y-1/2"></div>

          <div className="absolute left-1/2 top-0 bottom-0 w-2 bg-slate-700 -translate-x-1/2"></div>

        </div>

      </div>

      <div className="grid grid-cols-4 gap-3 mt-8">

        {colors.map((color) => (

          <div
            key={color.name}
            className="bg-slate-800 rounded-xl p-3 text-center border border-slate-700"
          >

            <div
              className={`w-5 h-5 rounded-full mx-auto mb-2 ${color.bg}`}
            />

            <p className={`font-semibold ${color.text}`}>
              {color.name}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default LobbyBoardPreview;