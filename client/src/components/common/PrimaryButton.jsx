function PrimaryButton({
  children,
  onClick,
  full = true
}) {
  return (
    <button
      onClick={onClick}
      className={`
      ${
        full
          ? "w-full"
          : ""
      }
      py-4
      rounded-xl
      font-bold
      text-lg
      text-white
      bg-gradient-to-r
      from-purple-600
      to-cyan-500
      hover:scale-105
      transition-all
      duration-300
      shadow-lg
      shadow-purple-500/20
      `}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;