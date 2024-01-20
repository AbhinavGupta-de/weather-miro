import * as React from 'react';
import { createRoot } from 'react-dom/client';

import '../src/assets/style.css';

const App = () => {
	const [city, setCity] = React.useState('');

	const [weather, setWeather] = React.useState({});

	const handleChange = (event) => {
		setCity(event.target.value);
	};

	async function addSticky() {
		const stickyNote = await miro.board.createStickyNote({
			content: weather.name,
		});

		await miro.board.viewport.zoomTo(stickyNote);
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		fetchWeather(city)
			.then((data) => {
				console.log(data);
				setWeather(data);
				const weatherInfo = document.querySelector('.weather-info');
				weatherInfo.innerHTML = `
      <h2>Weather in ${data.name}</h2>
      <p>Temperature: ${data.main.temp}</p>
      <p>Feels like: ${data.main.feels_like}</p>
      <p>Humidity: ${data.main.humidity}</p>
      <p>Pressure: ${data.main.pressure}</p>
      <p>Wind: ${data.wind.speed}</p>
      `;
			})
			.catch((err) => {
				console.log(err);
			});
	};

	async function fetchWeather(city) {
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=355959699b808e06c554bb829c5962f2`
		);
		const weather = await response.json();
		return weather;
	}

	React.useEffect(() => {
		addSticky();
	}, [weather]);

	return (
		<div className="grid wrapper">
			<div className="cs1 ce12">
				<h1>Welcome to the Weather App</h1>
			</div>

			<div className="cs1 ce12">
				<h2>Enter your city name</h2>

				<input
					type="text"
					placeholder="Enter your city name"
					value={city}
					onChange={handleChange}
				/>

				<button onClick={handleSubmit}>Submit</button>

				<div className="weather-info"></div>
			</div>
		</div>
	);
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
