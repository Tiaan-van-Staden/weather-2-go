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
  const [isYesChecked, setIsYesChecked] = useState(false);
  const [isNoChecked, setIsNoChecked] = useState(false);
  const [threshol, setThreshold] = useState([20, 60]);

  const handleYesChange = () => {
    setIsYesChecked(!isYesChecked);
    setIsNoChecked(false);
    setThreshold([20, 70]);
  };

  const handleNoChange = () => {
    setIsNoChecked(!isNoChecked);
    setIsYesChecked(false);
    setThreshold([10, 50]);
  };

  const predictBackground = () => {
    if (!weather) return "bg-green-500";
    const threshold = units === "metric" ? threshol[0] : threshol[1];
    if (weather.temp <= threshold) return "bg-green-500";
    console.log(threshol[0]);
    return "bg-red-700";
  };

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

  return (
    <div
      className="flex"
      style={{
        backgroundImage:
          "url(abstract-optical-laser-horizontal-background.jpg)",
      }}
    >
      <div className="w-3/12 p-4 text-center relative">
        <div className="flex flex-col items-center py-5 bg-gray-900 shadow-xl shadow-gray-400 h-full">
          <p className="text-justify text-white text-lg p-8 mt-4">
            Here you are able to predict the type of day you will have based on
            the weather and 1 crucial question.
            <p className="mt-4">
              If the output of the spheer or truth returns green, you will be
              blessed, if it returns red, well...
            </p>
          </p>
          <div
            className={`w-44 h-44 rounded-full left-1/2 transform -translate-x-1/2 ${predictBackground()} border-4 border-gradient`}
          ></div>
          <div className=" text-white font-medium p-8 mt-4">
            <h2 className="text-2xl mb-4">Do you have lunch today?</h2>
            <label className="inline-flex items-center checkbox-label">
              <input
                type="checkbox"
                className="hidden"
                checked={isYesChecked}
                onChange={handleYesChange}
              />
              <span className="custom-checkbox"></span>
              <span className="ml-2">Yes, haha</span>
            </label>
            <label className="inline-flex items-center ml-4 checkbox-label">
              <input
                type="checkbox"
                className="hidden"
                checked={isNoChecked}
                onChange={handleNoChange}
              />
              <span className="custom-checkbox"></span>
              <span className="ml-2">No</span>
            </label>
          </div>

          {/* <div className=" mt text-white font-medium p-8 mt-4">
            <h2>Do you have lunch today?</h2>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600"
                checked={isYesChecked}
                onChange={handleYesChange}
              />
              <span className="ml-2">Yes haha</span>
            </label>
            <label className="inline-flex items-center ml-4">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-red-600"
                checked={isNoChecked}
                onChange={handleNoChange}
              />
              <span className="ml-2">No</span>
            </label>
          </div> */}
          <div className="p-8">
            <img
              src="image_2023-08-26_125016696.png"
              alt="Retro logo"
              className="box-content h-75 w-60"
            />
          </div>
        </div>
      </div>

      <div className="w-6/12 p-4">
        <div className="flex flex-col items-center py-5 bg-gray-900 shadow-xl shadow-gray-400 h-full">
          <div className="p-4">
            <img
              src="image_2023-08-26_175739508.png"
              alt="Retro logo"
              className="box-content h-28 w-80"
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

      <div className="w-3/12 p-4 text-center relative">
        {/* <div className="bg-gray-200 p-2 rounded-md">
          <p>This is some text in a box.</p>
        </div> */}
        <div className="flex flex-col items-center py-5 bg-gray-900 shadow-xl shadow-gray-400 h-full">
          <p className="text-justify text-white text-lg p-8 mt-4">
            Make a choice of our carefully selected tourist locations based on
            the areas surrounding Retro Rabbit
          </p>
          <div className="p-4">
            <SideButtons setQuery={setQuery} />
          </div>
          <div className="p-8">
            <img
              src="image_2023-08-26_123042753.png"
              alt="Retro logo"
              className="box-content h-75 w-60"
            />
          </div>
        </div>
      </div>

      <ToastContainer autoClose={1000} theme="dark" newestOnTop={true} />
    </div>
  );
}

export default App;
