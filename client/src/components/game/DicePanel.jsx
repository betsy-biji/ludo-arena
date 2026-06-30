import { useState } from "react";

function Dice() {

  const [value,setValue] =
  useState(1);

  const rollDice = () => {

    const random =
      Math.floor(
        Math.random()*6
      )+1;

    setValue(random);
  };

  return (

    <div className="text-center">

      <div
        className="
        h-24
        w-24
        bg-white
        text-black
        rounded-xl
        flex
        items-center
        justify-center
        text-4xl
        font-bold
        "
      >
        {value}
      </div>

      <button
        onClick={rollDice}
        className="
        bg-green-500
        px-6
        py-2
        rounded
        mt-4
        "
      >
        Roll Dice
      </button>

    </div>
  );
}

export default Dice;