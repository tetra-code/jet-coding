import React, {useState, useContext, useEffect} from 'react';
import { processRestaurants } from './util';

const AppContext = React.createContext();

const proxyEndpoint = `http://localhost:8080/api`

// re-renders whenever its state or props change, but doesn't mean actual DOM updated (minimize unnecessary updates)
const AppProvider = ({children}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [restaurants, setRestaurants] = useState([]);
    const [resultTitle, setResultTitle] = useState("");
    const [isDeliveryMode, setDeliveryMode] = useState(true)
    const [cuisineType, setCuisineType] = useState("")
    const [postCodeResult, setPostCodeResult] = useState(null);
    const [clickedRestaurant, setClickedRestaurant] = useState(null);
    const [loading, setLoading] = useState(false);

    // ensures new instance of fetchRestaurant is called whenever it's created
    useEffect(() => {
        const fetchRestaurants = async() => {
            setLoading(true);
            try {
                const response = await fetch(`${proxyEndpoint}/${searchTerm}`);
                const data = await response.json();
                const restaurantList = data.restaurants;
                if (restaurantList){
                    const processedRestaurants = processRestaurants(restaurantList, cuisineType, isDeliveryMode);
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

                    if (restaurants.length > 0){
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
            setLoading(false);
        };
        if (searchTerm !== "") {
            fetchRestaurants().then();
        }
    }, [searchTerm, cuisineType, isDeliveryMode]);

    return (
        // must provide to be accessible to other components
        <AppContext.Provider value = {{
            restaurants,
            resultTitle, setResultTitle,
            searchTerm, setSearchTerm,
            isDeliveryMode, setDeliveryMode,
            cuisineType, setCuisineType,
            postCodeResult, setPostCodeResult,
            clickedRestaurant, setClickedRestaurant,
            loading
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export {AppContext, AppProvider};