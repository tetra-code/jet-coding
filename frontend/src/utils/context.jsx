import React, {useState, useContext, useEffect} from 'react';
import { processRestaurants } from './util';

const AppContext = React.createContext();

const proxyEndpoint = `http://localhost:8080/api`

/**
 * Returns the AppProvider component that provides the global context to all child components. Whenever its
 * state or props change (e.g. searchTerm, cuisineType, isDeliveryMode), it re-renders and updates the child
 * components. However, that doesn't mean the actual DOM is updated.
 *
 * @param children      the child components
 */
const AppProvider = ({children}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [restaurants, setRestaurants] = useState([]);
    const [resultTitle, setResultTitle] = useState("");
    const [isDeliveryMode, setDeliveryMode] = useState(true)
    const [cuisineType, setCuisineType] = useState("")
    const [postCodeResult, setPostCodeResult] = useState(null);
    const [clickedRestaurant, setClickedRestaurant] = useState(null);
    const [loading, setLoading] = useState(false);

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
    // ensures new instance of fetchRestaurant is called whenever the following states change
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