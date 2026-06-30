function ActionCard({

    title,

    description,

    icon,

    color,

    onClick,

    children

}){

return(

<div

onClick={onClick}

className="

cursor-pointer

rounded-3xl

bg-white/5

border

border-white/10

backdrop-blur-xl

hover:scale-105

hover:border-cyan-400

transition-all

duration-300

p-8

shadow-xl

"

>

<div
className="text-6xl mb-6"
>

{icon}

</div>

<h2
className="text-3xl font-bold mb-3"
>

{title}

</h2>

<p
className="text-gray-400"
>

{description}

</p>

<div className="mt-8">

{children}

</div>

</div>

);

}

export default ActionCard;