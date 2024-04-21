import React, {useState, useContext, useEffect} from 'react';
import { useCallback } from 'react';
const AppContext = React.createContext();


let proxyEndpoint = `http://localhost:8080/api`


const AppProvider = ({children}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [restaurants, setRestaurants] = useState([]);
    const [resultTitle, setResultTitle] = useState("");
    const [searchMode, setSearchMode] = useState("delivery")

    const fetchRestaurants = useCallback(async() => {
        try {
            const response = await fetch(`${proxyEndpoint}/${searchTerm}`);
            const data = await response.json();
            const restaurantList = data['restaurants']
            if (restaurantList){
                const restaurants = restaurantList.slice(0, 10).map((singleRestaurant) => {
                    const {id, name, cuisine, rating, address} = singleRestaurant;
                    return {
                        id: id,
                        name: name,
                        cuisine: cuisine,
                        rating: rating,
                        address: address
                    }
                });

                setRestaurants(restaurants);

                if (restaurants.length > 1){
                    setResultTitle("Your Search Result");
                } else {
                    setResultTitle("No Search Result Found!")
                }
            } else {
                setRestaurants([]);
                setResultTitle("No Search Result Found!");
            }
        } catch(error){
            console.log(error);
        }
    }, [searchTerm]);

    useEffect(() => {
        fetchRestaurants().then();
    }, [searchTerm, fetchRestaurants]);

    return (
        <AppContext.Provider value = {{
            restaurants, resultTitle, searchTerm, setSearchTerm, setResultTitle, searchMode, setSearchMode
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export {AppContext, AppProvider};