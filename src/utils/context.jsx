import React, {useState, useContext, useEffect} from 'react';
import { useCallback } from 'react';
const AppContext = React.createContext();


let proxyEndpoint = `http://localhost:8080/api`

// re-rendered whenever its state or props change
const AppProvider = ({children}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [restaurants, setRestaurants] = useState([]);
    const [resultTitle, setResultTitle] = useState("");
    const [searchMode, setSearchMode] = useState("delivery")
    const [cuisineType, setCuisineType] = useState("")

    const processRestaurants = (restaurantList) => {
        const reducedCuisineDataRestaurants = restaurantList.map((r) => {
            return {
                ...r,
                cuisines: r.cuisines.map((c) => c.name)
            }
        })
        const cuisineSpecialRestaurant = cuisineType !== ""
            ? reducedCuisineDataRestaurants.filter((r) => r.cuisines.includes(cuisineType))
            : reducedCuisineDataRestaurants
        return cuisineSpecialRestaurant
            .filter((r) => r !== undefined &&
                r.availability !== undefined &&
                r.availability.delivery !== undefined &&
                r.availability.delivery.etaMinutes !== undefined)
            .filter((r) => r.availability.delivery.isOpen)
            .sort((r1, r2) => r1.availability.delivery.etaMinutes.rangeLower -
                r2.availability.delivery.etaMinutes.rangeLower);
    };

    // ensures new instance of fetchRestaurant is called whenever it's created
    const fetchRestaurants = useCallback(async() => {
        try {
            console.log("Fetch restaurants invoked")
            const response = await fetch(`${proxyEndpoint}/${searchTerm}`);
            const data = await response.json();
            const restaurantList = data.restaurants;
            if (restaurantList){
                const processedRestaurants = processRestaurants(restaurantList);
                const sliceHigh = Math.min(10, processedRestaurants.length);
                const restaurants = processedRestaurants.slice(0, sliceHigh).map((singleRestaurant) => {
                    const {id, name, cuisines , rating, address, logoUrl, availability} = singleRestaurant;
                    return {
                        id: id,
                        name: name,
                        cuisines: cuisines,
                        rating: rating,
                        address: address,
                        logoUrl: logoUrl,
                        availability: availability
                    }
                });
                setRestaurants(restaurants);

                if (restaurants.length > 1){
                    setResultTitle("Your Search Result");
                } else {
                    setResultTitle("No Restaurants Available")
                }
            } else {
                setRestaurants([]);
                setResultTitle("No Search Result Found!");
            }
        } catch(error){
            console.log(error);
        }
    }, [searchTerm, cuisineType]);     // ensure new instance fetchRestaurants is created whenever its depepdnesis changes

    // ensures new instance of fetchRestaurant is called whenever it's created
    useEffect(() => {
        fetchRestaurants().then();
    }, [searchTerm, cuisineType]);

    return (
        <AppContext.Provider value = {{
            restaurants,
            resultTitle,
            searchTerm, setSearchTerm,
            setResultTitle,
            searchMode, setSearchMode,
            cuisineType, setCuisineType
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export {AppContext, AppProvider};