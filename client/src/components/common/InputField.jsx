function InputField({
  placeholder,
  type = "text",
  value,
  onChange
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="
      w-full
      bg-slate-900/70
      border
      border-white/10
      rounded-xl
      px-5
      py-4
      text-white
      placeholder:text-gray-400
      focus:outline-none
      focus:border-cyan-400
      transition-all
      "
    />
  );
}

export default InputField;