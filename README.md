# Weather API App 🌤️

This is a simple weather lookup app built using:

- **Next.js 15 App Router**
- **TypeScript**
- **OpenWeatherMap API**

# Description
This app allows users to enter a city name and view the current weather conditions in that location, including temperature, weather description, and country.

## Key Features

- Enter a city name and get:
  - Temperature in °C
  - Weather description
  - Location (city + country)

## Requirements
* <a href="https://nodejs.org/en">Node.js</a> installed (version 16 or newer recommended)
* OpenWeather API key (You'll need to set this in an environment variable)

## Getting Started
1. Clone the github
```bash
git clone https://github.com/NathanielAri/Weather_API.git
cd Weather_API
```
2. Install dependencies
```bash
npm install
```
3. Create an .env.local file
```bash
vim .env.local
```
Add your OpenWeather API key to it:
```bash
NEXT_PUBLIC_API_KEY=your_openweather_api_key_here
```
4. Run the development server
```bash
npm run dev
```
Go to [http://localhost:3000](http://localhost:3000) to see the app

## Build and Run in Production
```bash
npm run build
npm start
```