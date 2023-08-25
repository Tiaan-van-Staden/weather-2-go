import "./App.css";
//import UilReact from '@iconscout/react-unicons/icons/uil-react';
import SideButtons from "./components/SideButtons";
import Inputs from "./components/Inputs";
import TimeNlocation from "./components/TimeNlocation";
import TempDetails from "./components/TempDetails";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/weatherSevices";
import { useEffect, useState } from "react";
//import getWeatherData from "./services/weatherSevices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [query, setQuery] = useState({ q: "gauteng" }); //default
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : "current location";

      toast.info("Fetching weather for " + message);

      await getFormattedWeatherData({ ...query, units }).then((data) => {
        //Here I can enter either the city or the coords

        toast.success(
          `Successfully fetched weather date for ${data.name}, ${data.country}`
        );

        setWeather(data);
      });
    };

    fetchWeather();
  }, [query, units]);

  const predictBackground = () => {
    if (!weather) return "bg-green-500";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "bg-green-500";

    return "bg-red-500";
  };

  return (
    <div
      className="flex"
      style={{
        backgroundImage:
          "url(abstract-optical-laser-horizontal-background.jpg)",
      }}
    >
      <div className="w-1/6 p-4 text-center relative">
        <div className="flex flex-col items-center py-5 bg-gray-900 shadow-xl shadow-gray-400 h-full">
          <div
            className={` w-44 h-44 rounded-full absolute bottom-0 left-1/2 transform -translate-x-1/2 ${predictBackground()}`}
          ></div>
        </div>
      </div>

      <div className="w-4/6 p-4">
        <div className="flex flex-col items-center py-5 bg-gray-900 shadow-xl shadow-gray-400 h-full">
          <div className="p-4">
            <img
              src="image_2023-08-23_152135650.png"
              alt="Retro logo"
              className="box-content h-32 w-60"
            />
          </div>

          <div className="p-4">
            <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

            {weather && (
              <div>
                <TimeNlocation weather={weather} />
                <TempDetails weather={weather} />

                <Forecast title="hourly forecast" items={weather.hourly} />
                <Forecast title="daily forecast" items={weather.daily} />
              </div>
            )}
          </div>

          <div className="p-4"></div>
        </div>
      </div>

      <div className="w-1/6 p-4 text-center relative">
        <div className="flex flex-col items-center py-5 bg-gray-900 shadow-xl shadow-gray-400 h-full">
          <p className="text-white text-l font-light">
            Make a choice of our carefully selected tourist locations based on
            the areas surrounding Retro Rabbit
          </p>
          <SideButtons setQuery={setQuery} />
        </div>
      </div>

      <ToastContainer autoClose={1500} theme="dark" newestOnTop={true} />
    </div>
  );
}

export default App;
