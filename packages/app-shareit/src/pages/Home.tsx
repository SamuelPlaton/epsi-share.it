import {FunctionComponent} from "react";

const Home: FunctionComponent = () => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-screen py-4 bg-gray-100'>
      <div className='h-1/3 my-8 flex items-center'>
        <img src='logo.png' alt='logo' className="relative w-64" />
      </div>
      <div className='flex flex-col flex-grow'>
        <button className="bg-blue-500 p-4 rounded-md shadow-md text-lg text-white mb-2">Se connecter</button>
        <button className="text-gray-400 text-sm">Je n'ai pas de compte</button>
      </div>
  </div>
  );
}

export default Home;
