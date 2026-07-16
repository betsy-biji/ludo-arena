import { useEffect, useRef, useState } from "react";
import "./DicePanel.css";
import DiceFace from "./DiceFace";

function DicePanel({
  diceValue,
  onRoll,
}) {
  const [rolling, setRolling] = useState(false);
  const [displayValue, setDisplayValue] = useState(1);
  const [landed, setLanded] = useState(false);

  // Remember previous dice value
  const previousDice = useRef(null);

  function handleRoll() {
    onRoll();
  }

  useEffect(() => {

    // Ignore null
    if (diceValue === null) return;

    // Ignore same value again
    if (previousDice.current === diceValue) return;

    previousDice.current = diceValue;

    setRolling(true);

    const values = [];

    for (let i = 0; i < 8; i++) {
      values.push(
        Math.floor(Math.random() * 6) + 1
      );
    }

    values.push(diceValue);

    let index = 0;

    const interval = setInterval(() => {

      setDisplayValue(values[index]);

      index++;

      if (index >= values.length) {

        clearInterval(interval);

        setRolling(false);

        setLanded(true);

        setTimeout(() => {
          setLanded(false);
        }, 250);

      }

    }, 80);

    return () => clearInterval(interval);

  }, [diceValue]);

  return (
    <div className="dice-container">

      <div
        className={`dice-wrapper
          ${rolling ? "rolling" : ""}
          ${landed ? "landed" : ""}
        `}
      >
        <div className="dice-svg">
          <DiceFace value={displayValue} />
        </div>
      </div>

      <button
        className="roll-btn"
        disabled={rolling}
        onClick={handleRoll}
      >
        {rolling ? "Rolling..." : "🎲 Roll Dice"}
      </button>

    </div>
  );
}

export default DicePanel;