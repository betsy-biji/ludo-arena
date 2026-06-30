function Background() {
  return (
    <div
      className="
      fixed
      inset-0
      -z-10
      overflow-hidden
      "
    >
      <div
        className="
        absolute
        top-[-200px]
        left-[-200px]
        w-[500px]
        h-[500px]
        bg-purple-600/20
        blur-[150px]
        rounded-full
        "
      />

      <div
        className="
        absolute
        bottom-[-200px]
        right-[-200px]
        w-[500px]
        h-[500px]
        bg-cyan-500/20
        blur-[150px]
        rounded-full
        "
      />

      <div
        className="
        absolute
        inset-0
        bg-slate-950
        "
      />
    </div>
  );
}

export default Background;