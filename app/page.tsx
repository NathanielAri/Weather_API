'use client'

import { useEffect, useState } from "react"
import styles from './page.chart.module.css'

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
    useEffect(() => {
        if(!city) return setError('Please enter a city name')

            const fetchWeather = async () => {
                setLoading(true)
                    setError(null)

                    try {
                        //fetch geo location, gets the api key from .env
                        const apiKey = process.env.NEXT_PUBLIC_API_KEY
                        const geoRes = await fetch(
                            `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${apiKey}`
                        )

                        const geoData = await geoRes.json()

                        //Confirm geo location
                        if(!geoRes.ok || !geoData.length) throw new Error('City not Found')

                        const { lat, lon, name, country } = geoData[0]

                        //fetch weather data
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
        fetchWeather()
    }, [city])
        

        

    //Button, text input, onclick call fetchWeather
    return(
        <div className={styles.wrapper}>
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter city name"/>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {weather && (
                <div>
                    <h2>
                        {weather.locationName}, {weather.country} Weather
                    </h2>
                    <p>
                        Temperature: {weather.main.temp} °C
                    </p>
                    <p>
                        Weather: {weather.weather[0].description}
                    </p>
                </div>
            )}

        </div>
    )

}