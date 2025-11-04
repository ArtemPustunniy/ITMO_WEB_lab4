import type { ReactElement } from "react";
import { useState } from "react";
import Header from "./components/layout/Header";
import CityTimeCard from "./components/weather/CityTimeCard";
import CurrentWeatherCard from "./components/weather/CurrentWeatherCard";
import ForecastList from "./components/weather/ForecastList";
import HourlyForecast from "./components/weather/HourlyForecast";
import type { GeoItem } from "./components/search/SearchSuggestions";
import { useGeolocation } from "./hooks/useGeolocation";
import { reverseGeocode } from "./services/owm";
import { useFetchJson } from "./hooks/useFetchJson";

function App(): ReactElement {
    const [location, setLocation] = useState<GeoItem | null>(null);
    const geo = useGeolocation();
    
    const reverseUrl = geo.coords ? reverseGeocode(geo.coords.lat, geo.coords.lon) : null;
    const { data: reverseData } = useFetchJson<any>(reverseUrl, [geo.coords]);
    
    const handleCurrentLocation = () => {
        if (geo.coords && reverseData?.[0]) {
            const item = reverseData[0];
            setLocation({
                name: item.name,
                lat: item.lat,
                lon: item.lon,
                country: item.country,
                state: item.state,
            });
        }
    };

    return (
        <div className="min-h-full container-app py-8">
            <Header onPickCity={(it) => setLocation(it)} onCurrentLocation={handleCurrentLocation} />
            {location && (
                <main className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6 items-stretch">
                        <div className="w-full md:w-[40%] flex">
                            <div className="w-full h-full">
                                <CityTimeCard city={location?.name} />
                            </div>
                        </div>
                        <div className="w-full md:w-[60%] flex">
                            <div className="w-full h-full">
                                <CurrentWeatherCard lat={location?.lat} lon={location?.lon} />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-6 items-stretch">
                        <div className="w-full md:w-[30%] flex">
                            <div className="w-full h-full">
                                <ForecastList lat={location?.lat} lon={location?.lon} />
                            </div>
                        </div>
                        <div className="w-full md:w-[70%] flex">
                            <div className="w-full h-full">
                                <HourlyForecast lat={location?.lat} lon={location?.lon} />
                            </div>
                        </div>
                    </div>
                </main>
            )}
        </div>
    );
}

export default App;