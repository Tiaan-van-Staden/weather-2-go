import './App.css';
//import UilReact from '@iconscout/react-unicons/icons/uil-react';
import SideButtons from './components/SideButtons';
import Inputs from './components/Inputs';

function App() {
  return (
    <div className=" flex">
      <div className="w-1/3 p-4">
        
      </div>
      <div className="w-3/5 p-4">
        <div className=' mt-4 py-5 bg-gradient-to-br from-slate-900 to-slate-800 shadow-xl shadow-gray-400'>
          <div className="w-1/4 p-4 text-center">
            <img src="retrologo.jpeg" alt="Retro logo" className="mx-10"/>
          </div>
          <Inputs/>
        </div>
      </div>
      <div className="w-1/5 p-6">
        <SideButtons/>
      </div>
    </div>
  );
}

// function App() {
//   return (
//     <div className='flex mx-auto mt-4 py-5 px-36'>
//       {/* Left Column */}
//       <div className='w-1/4 pr-4'>
//         {/* Content for the left column */}
//       </div>
      
//       {/* Center Column */}
//       <div className='flex-1 bg-gradient-to-br from-slate-900 to-slate-800 h-fit shadow-xl shadow-gray-400 px-4'>
//         {/* Content for the center column (gray block) */}
//       </div>
      
//       {/* Right Column */}
//       <div className='w-1/4 ml-4'>
//         <SideButtons />
//       </div>
//     </div>
//   );
// }

export default App;
