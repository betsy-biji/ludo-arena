function DicePanel({
  diceValue,
  onRoll,
}) {
  return (
    <div className="text-center">

      <div
        className="
        h-28
        w-28
        bg-white
        rounded-2xl
        flex
        items-center
        justify-center
        text-5xl
        font-black
        text-black
        shadow-xl
        border-4
        border-slate-300
        transition-all
        duration-300
        "
      >
        {diceValue ?? "🎲"}
      </div>

      <button
        onClick={onRoll}
        className="
        mt-5
        bg-cyan-500
        hover:bg-cyan-600
        transition
        px-8
        py-3
        rounded-xl
        text-white
        font-bold
        text-lg
        shadow-lg
        "
      >
        Roll Dice
      </button>

    </div>
  );
}

export default DicePanel;