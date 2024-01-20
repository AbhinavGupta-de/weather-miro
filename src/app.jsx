import * as React from 'react';
import { createRoot } from 'react-dom/client';
import Select from 'react-select';

import '../src/assets/style.css';

const API_KEY = import.meta.env.VITE_API_KEY;

const App = () => {
	const [city, setCity] = React.useState('');

	const [selectedCountry, setSelectedCountry] = React.useState('');

	const [weather, setWeather] = React.useState({});

	const handleChange = (event) => {
		setCity(event.target.value);
	};

	const handleCountryChange = (selectedOption) => {
		    setSelectedCountry(selectedOption);
		  };


	async function addSticky() {
		const stickyNote = await miro.board.createStickyNote({
			content: weather.name,
		});

		await miro.board.viewport.zoomTo(stickyNote);
	}

	const handleSubmit = (event) => {
		event.preventDefault();

		if (!selectedCountry) {
			alert('Please select a country.');
			return;
		  }
		fetchWeather(selectedCountry.label, city)
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
		
		async function fetchWeather(selectedCountry,city) {
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${selectedCountry}&appid=` + API_KEY
		);
		// console.log(selectedCountry);
		// print(city);
		const weather = await response.json();
		return weather;
	}

	React.useEffect(() => {
		addSticky();
	}, [weather]);

	const countryOptions = [
		    { value: 'usa', label: 'United States' },
		    { value: 'canada', label: 'Canada' },
		    { value: 'uk', label: 'United Kingdom' },
		    { value: 'germany', label: 'Germany' },
		    { value: 'ke', label: 'Kenya' },
		    // Add more countries as needed
		  ];

	return (
		<div className="grid wrapper">
			<div className="cs1 ce12">
				<h1>Welcome to the Weather App</h1>
			</div>

			<div className="cs1 ce12">
				<h2>Enter your city name</h2>

				<Select
					value={selectedCountry}
					onChange={handleCountryChange}
					options={countryOptions}
					placeholder="Select a country"
       		 	/>

				<input
					type="text"
					placeholder="Enter your city name"
					value={city}
					onChange={handleChange}
					/>
				<button onClick={handleCountryChange}>Submit</button>

				<div className="weather-info"></div>
			</div>
		</div>
	);
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);


