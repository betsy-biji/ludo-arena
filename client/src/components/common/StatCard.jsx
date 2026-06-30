function StatCard({

title,

value,

color

}){

return(

<div

className="

bg-white/5

backdrop-blur-xl

rounded-2xl

border

border-white/10

p-6

"

>

<p
className="
text-gray-400
text-sm
"
>

{title}

</p>

<h2

className={`

text-4xl

font-bold

mt-3

${color}

`}

>

{value}

</h2>

</div>

);

}

export default StatCard;