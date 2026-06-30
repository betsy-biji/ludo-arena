function GlassCard({ children }) {
  return (
    <div
      className="
      bg-white/5
      backdrop-blur-xl
      border
      border-white/10
      rounded-3xl
      shadow-2xl
      p-8
      "
    >
      {children}
    </div>
  );
}

export default GlassCard;