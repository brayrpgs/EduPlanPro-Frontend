import React from "react";
import LoadIcon from '../icons/MainIcons/LoadIcon'

const Loading = () => {
  return (
    <div>
      <div className="bg-gray-600/50 min-h-screen w-full z-40 flex fixed top-0 right-0 left-0 backdrop-blur-[0.3vh]"></div>

      <div className="w-[8vw] min-h-[8vh] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center justify-center overflow-hidden">
          <LoadIcon/> 
      </div>
    </div>
  );
};

export default Loading;
