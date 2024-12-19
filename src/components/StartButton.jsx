const StartButton = ({ onClick }) => {
  return (
    <button
      //add shadow din siguro later
      className="mr-2 flex items-center space-x-1 border-2 border-95-white border-b-95-black border-r-95-black bg-95-gray px-2 py-1 font-semibold focus:outline-none active:border-95-black active:border-b-95-white active:border-r-95-white"
      onClick={onClick}
    >
      {/* Microsoft logo cutesy */}
      <div className="flex h-4 w-4 items-center justify-center bg-[#008080]">
        <div className="grid h-3 w-3 grid-cols-2 grid-rows-2 bg-95-gray">
          <div className="bg-red-500"></div>
          <div className="bg-green-500"></div>
          <div className="bg-blue-500"></div>
          <div className="bg-yellow-500"></div>
        </div>
      </div>
      <span className="font-MS95 text-sm text-95-black">Start</span>
    </button>
  );
};

export default StartButton;
