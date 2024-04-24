/**
 * Receives list of unprocessed restaurant data from the API call.
 *
 * First reduces cuisine dict attribute of each restaurant to a list of cuisine names. Then filers out
 * restaurants that don't include the specified cuisine type. Additional filtering for restaurants that don't
 * specify its availability nor delivery time.
 *
 * If delivery mode, filter out restaurants not open for delivery and sort based on delivery lower range.
 * Else, filter out restaurants not open for collection (pickup) and sort based on distance.
 *
 * @param rawRestaurantData     List of unprocessed restaurant data
 * @param cuisineType           cuisine type the user is searching for
 * @param isDeliveryMode        whether it is in delivery mode or not
 */
export const processRestaurants = (rawRestaurantData, cuisineType, isDeliveryMode) => {
    const reducedCuisineDataRestaurants = rawRestaurantData.map((r) => {
        return {
            ...r,
            cuisines: r.cuisines.map((c) => c.name)
        }
    })
    const cuisineSpecialRestaurant = cuisineType !== ""
        ? reducedCuisineDataRestaurants.filter((r) => r.cuisines.includes(cuisineType))
        : reducedCuisineDataRestaurants

    if (isDeliveryMode) {
        return cuisineSpecialRestaurant
            .filter((r) => r !== undefined &&
                r.availability !== undefined &&
                r.availability.delivery !== undefined &&
                r.availability.delivery.etaMinutes !== undefined)
            .filter((r) => r.availability.delivery.isOpen)
            .sort((r1, r2) => r1.availability.delivery.etaMinutes.rangeLower -
                r2.availability.delivery.etaMinutes.rangeLower);
    }
    return cuisineSpecialRestaurant
        .filter((r) => r !== undefined &&
            r.driveDistanceMeters !== undefined &&
            r.availability !== undefined &&
            r.availability.collection !== undefined &&
            !r.availability.collection.isOpen)
        .sort((r1, r2) => r1.driveDistanceMeters -  r2.driveDistanceMetersr);
};

/**
 * Takes a dict of restaurant address and returns a string representation of the address.
 *
 * @param restaurantAddress     Dict of restaurant address
 */
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

/**
 * Takes a list of restaurant cuisines and filters for actual cuisine types.
 */
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

/**
 * Takes a string and returns true if it is a valid UK postcode.
 *
 * @param searchTermStr         String value of the search term
 */
export const isValidUKPostcode = (searchTermStr) => {
    const trimmedSearchTerm = searchTermStr.replaceAll(' ', '')
    const regexString = "^([A-Za-z]{1,2}[0-9][A-Za-z0-9]?\\s?[0-9][A-Za-z]{2}|[Gg][Ii][Rr]\\s?0[Aa]{2})$";

    // official regex from UK government but doesn't seem to work for all tests
    // = "([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\\s?[0-9][A-Za-z]{2})"
    const postCodeRegex = new RegExp(regexString);
    return trimmedSearchTerm.length <= 7 && postCodeRegex.test(trimmedSearchTerm);
}
