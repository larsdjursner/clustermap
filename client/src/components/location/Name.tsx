const NameInput = () => {
  return (
    <input
      type="text"
      name="name"
      className={
        "relative w-full h-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"
      }
    />
  );
};
export default NameInput;