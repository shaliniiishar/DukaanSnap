const Button = ({
  children,
  variant = "primary",
  type = "button",
  onClick,
  disabled = false,
  fullWidth = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`button button-${variant} ${
        fullWidth ? "button-full" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default Button;