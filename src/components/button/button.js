import("../../styles/styles-weather-card/weather_card_button.css");

export const Button = ({ text, onClick, type, variant }) => (
  <button
    type={type}
    onClick={onClick}
    className={`card_button ${variant === "delete" ? "delete" : ""}`}
  >
    {variant === "delete" ? (
      <span className="btn-icon" aria-label="Удалить">
        ×
      </span>
    ) : (
      text
    )}
  </button>
);
