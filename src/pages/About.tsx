import React from "react";

const About: React.FC = () => {
  return (
    <div className="h-full min-h-screen bg-amber-100 rounded-sm">
      <div className="bg-slate-200 rounded-md mx-2">
        <div className="m-3">
      <h3  className="font-bold content-center text-gray-700">About</h3>
      <p>
        This project was created by Dwight Lindquist in August 2022. You can
        reach him online at one of the links listed below. Thank you for
        visiting the site. 加油！
      </p>
      <p>
        <button className="bg-red-400 hover:bg-red-500 text-white px-2 rounded cursor-pointer m-2"><a href="https://github.com/dlindqu3/">GitHub Link</a></button>
        
        <button className="bg-blue-500 hover:bg-blue-700 text-white px-2 rounded cursor-pointer m-2"><a href="https://www.linkedin.com/in/dwight-lindquist/">LinkedIn Link</a></button>
  
      </p>
      </div>
      </div>
    </div>
  );
};

export default About;
