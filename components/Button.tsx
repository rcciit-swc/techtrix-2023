
const Button = ({text}:{text:string}) => {
  return (
    <button className="bg-gray-600 hover:bg-zinc-900 text-white py-2 px-4 rounded-2xl mt-3 text-xl">
      {text}
    </button>
  );
};

export default Button;
