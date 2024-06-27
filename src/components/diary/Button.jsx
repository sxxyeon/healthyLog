const Button = ({ text, type, onClick,children }) => {
  const btnType = ["positive", "negative"].includes(type) ? type : "default";
  return (
    <button
      className={["Button", `Button_${btnType}`].join(" ")}
      onClick={onClick}
    >
      {text}{children}
    </button>
  );
};
Button.defaultProps = {
  type: "default",
};
export default Button;