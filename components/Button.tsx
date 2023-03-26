const Button = ({ text, onClick }: { text: string; onClick: () => void }) => {
  return (
    <button className="button mt-6" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
