import "./input.css";

export function Input({
  inputValue,
  setInputValue,
  type = "text",
  label,
  value,
  onChange,
  placeholder,
  ...props
}) {
  const handleInputChange = (event) => {
    if (setInputValue) {
      setInputValue(event.target.value);
    } else if (onChange) {
      onChange(event);
    }
  };

  return (
    <div style={{ padding: "5px", fontFamily: "Arial" }}>
      <div className="input">
        {label && <label>{label}</label>}
        <input
          type={type}
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          {...props}
        />
      </div>
    </div>
  );
}
