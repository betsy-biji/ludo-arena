function DiceFace({ value }) {
  const dots = {
    1: [[50, 50]],

    2: [
      [25, 25],
      [75, 75],
    ],

    3: [
      [25, 25],
      [50, 50],
      [75, 75],
    ],

    4: [
      [25, 25],
      [25, 75],
      [75, 25],
      [75, 75],
    ],

    5: [
      [25, 25],
      [25, 75],
      [50, 50],
      [75, 25],
      [75, 75],
    ],

    6: [
      [25, 25],
      [50, 25],
      [75, 25],
      [25, 75],
      [50, 75],
      [75, 75],
    ],
  };

  return (
    <svg
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
    >
      <rect
        x="3"
        y="3"
        width="94"
        height="94"
        rx="18"
        fill="white"
        stroke="#d1d5db"
        strokeWidth="4"
      />

      {dots[value].map(([cx, cy], index) => (
        <circle
          key={index}
          cx={cx}
          cy={cy}
          r="7"
          fill="#111827"
        />
      ))}
    </svg>
  );
}

export default DiceFace;