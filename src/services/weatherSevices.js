import { DateTime } from "luxon";

const API_KEY = "7d49be4496f6da010a40b62bee36bf2f";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = (infoType, searhParams) => {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searhParams, appid: API_KEY });

  return fetch(url).then((res) => res.json());
};

const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    details,
    icon,
    speed,
  };
};

//from here

const formatForecastWeather = (data) => {
  let { timezone, daily, hourly } = data;

  if (Array.isArray(daily)) {
    daily = daily.slice(1, 6).map((d) => {
      return {
        title: formatToLocalTime(d.dt, timezone, "ccc"),
        temp: d.temp.day,
        icon: d.weather[0].icon,
      };
    });
  }

  if (Array.isArray(hourly)) {
    hourly = hourly.slice(1, 6).map((d) => {
      return {
        title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
        temp: d.temp.day,
        icon: d.weather[0].icon,
      };
    });
  }

  return { timezone, daily, hourly };
};

// const formatForecastWeather = (data) => {
//   let { city, list } = data;
//   const timezone = data.city.timezone;

//   // Extract daily forecast data
//   const daily = list
//     .filter((d, index) => index % 8 === 0) // Get data every 24 hours (index divisible by 8)
//     .slice(0, 5) // Take the next 5 days
//     .map((d) => {
//       return {
//         title: formatToLocalTime(d.dt, timezone, "ccc"),
//         temp: d.main.temp,
//         icon: d.weather[0].icon,
//       };
//     });

//   // Extract hourly forecast data
//   const hourly = list
//     .slice(0, 5 * 8) // Take the next 5 days of hourly data (8 data points per day)
//     .map((d) => {
//       return {
//         title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
//         temp: d.main.temp,
//         icon: d.weather[0].icon,
//       };
//     });

//   return { timezone, daily, hourly };
// };

//to here

const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrentWeather);

  //from here

  const { lat, lon } = formattedCurrentWeather;

  const formattedForcastWeather = await getWeatherData("onecall", {
    lat,
    lon,
    exclude: "current, minutely, alerts",
    units: searchParams.units,
  }).then(formatForecastWeather);

  //to here

  return formattedCurrentWeather;
};

//from here

const formatToLocalTime = (
  secs,
  zone,
  format = "ccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

//to here

export default getFormattedWeatherData;
