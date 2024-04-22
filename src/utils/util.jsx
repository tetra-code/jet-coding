/*  Receives list of unprocessed restaurant data from the API call.
    First reduces cuisine dict attribute of each restaurant to a list of cuisine names.
    Then filers out restaurants that don't include the specified cuisine type.
    Additional filtering for restaurants that don't specify its availability nor delivery time.
    Finally, sorts the restaurants by their earliest delivery time.
*/
export const processRestaurants = (rawRestaurantData, cuisineType) => {
    const reducedCuisineDataRestaurants = rawRestaurantData.map((r) => {
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
    const arr = [];
    if (restaurantAddress.firstLine !== "") {
        arr.push(restaurantAddress.firstLine);
    }
    if (restaurantAddress.postalCode !== "") {
        arr.push(restaurantAddress.postalCode);
    }
    if (restaurantAddress.city !== "") {
        arr.push(restaurantAddress.city);
    }
    return arr.join(", ");
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

export const isValidUKPostcode = (searchTermStr) => {
    const trimmedSearchTerm = searchTermStr.replaceAll(' ', '')
    const regexString = "^([A-Za-z]{1,2}[0-9][A-Za-z0-9]?\\s?[0-9][A-Za-z]{2}|[Gg][Ii][Rr]\\s?0[Aa]{2})$";

    // official regex from UK government but doesn't seem to work for all tests
    // = "([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\\s?[0-9][A-Za-z]{2})"
    const postCodeRegex = new RegExp(regexString);
    return trimmedSearchTerm.length <= 7 && postCodeRegex.test(trimmedSearchTerm);
}