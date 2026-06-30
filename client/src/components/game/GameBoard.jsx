function Board() {

  const cells = [];

  for(let i=0;i<225;i++){

    cells.push(
      <div
        key={i}
        className="
        border
        border-slate-700
        h-8
        w-8
        "
      />
    );
  }

  return(

    <div
      className="
      grid
      grid-cols-15
      bg-white
      "
      style={{
        display:"grid",
        gridTemplateColumns:
        "repeat(15,32px)"
      }}
    >

      {cells}

    </div>

  );
}

export default Board;