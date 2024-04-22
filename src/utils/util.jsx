export const processRestaurants = (restaurantList, cuisineType) => {
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

export const getRestaurantAddrAsString = (restaurantAddress) => {
    return restaurantAddress.firstLine + ", " + restaurantAddress.postalCode + ", " + restaurantAddress.city;
}

export const getActualCuisinesAsString = (restaurantCuisines) => {
    return restaurantCuisines
        .filter(
            (c) => c.toLowerCase() !== "collect stamps"
                && c.toLowerCase() !== "deals"
                && c.toLowerCase() !== "low delivery fee"
                && c.toLowerCase() !== "freebies"
        )
        .join(", ")
}