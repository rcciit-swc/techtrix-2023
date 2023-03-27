const Button = ({ text, onClick }: { text: any; onClick: () => void }) => {
  return (
    <button className="button mt-6" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
