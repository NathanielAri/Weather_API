'use client'

import { useState } from "react"

//Creates custom type to be used for useState
type WeatherData = {
    main: {
        temp: number
    }
    weather: {description: string}[]
    locationName: string
    country: string
}

export default function Page(){
    //Initialize states
    const [city, setCity] = useState('')
    const [weather, setWeather] = useState<WeatherData | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    //Fetch weather using api, first geo location then weather api
    const fetchWeather = async () => {
        if(!city) return setError('Please enter a city name')

        setLoading(true)
        setError(null)

        try {
            const apiKey = '7dd68e758436a503914212743304a446'
            const geoRes = await fetch(
                `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${apiKey}`
            )

            const geoData = await geoRes.json()

            if(!geoRes.ok || !geoData.length) throw new Error('City not Found')

            const { lat, lon, name, country } = geoData[0]

            const weatherRes = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
            )

            const weatherData = await weatherRes.json()

            if(!weatherRes.ok) throw new Error(weatherData.message)

            weatherData.locationName = name
            weatherData.country = country

            setWeather(weatherData)
        } catch(err: unknown){
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError('An unexpected error occurred')
            }
        } finally {
            setLoading(false)
        }
    }

    //Button, text input, onclick call fetchWeather
    return(
        <div>
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter city name"/>
            <button onClick={fetchWeather}>
                Get Weather
            </button>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {weather && (
                <div>
                    <h2>
                        {weather.locationName}, {weather.country} Weather
                    </h2>
                    <p>
                        Temperature: {weather.main.temp}
                    </p>
                    <p>
                        Weather: {weather.weather[0].description}
                    </p>
                </div>
            )}

        </div>
    )

}