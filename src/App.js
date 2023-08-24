import "./App.css";
//import UilReact from '@iconscout/react-unicons/icons/uil-react';
import SideButtons from "./components/SideButtons";
import Inputs from "./components/Inputs";
import TimeNlocation from "./components/TimeNlocation";
import TempDetails from "./components/TempDetails";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/weatherSevices";
import getWeatherData from "./services/weatherSevices";

function App() {
  const fetchWeather = async () => {
    const data = await getFormattedWeatherData({ q: "london" }); //Here I can enter either the city or the coords
    console.log(data);
  };

  fetchWeather();

  return (
    <div className="flex">
      <div className="w-1/6 p-4">hi</div>

      <div className="w-4/6 p-4">
        <div className="flex flex-col items-center py-5 bg-gray-900 shadow-xl shadow-gray-400">
          <div className="p-4">
            <img
              src="image_2023-08-23_152135650.png"
              alt="Retro logo"
              className="box-content h-32 w-60"
            />
          </div>

          <div className="p-4">
            <Inputs />
            <TimeNlocation />
            <TempDetails />

            <Forecast title="hourly forecast" />
            {/* <Forecast title="daily forecast" /> */}
          </div>

          <div className="p-4"></div>
        </div>
      </div>

      <div className="w-1/6 p-4">
        <SideButtons />
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
