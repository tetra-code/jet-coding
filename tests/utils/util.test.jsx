import {
    isValidUKPostcode,
    getActualCuisinesAsString,
    getRestaurantAddrAsString,
    processRestaurants
} from "../../src/utils/util";

describe('Postcode validation', () => {
    const validSearchTerm1 = "EC4M7RF";
    const validSearchTerm2 = "EC4M 7RF";
    const validSearchTerm3 = "EC 4M 7RF";
    const validSearchTerm4 = "E C 4 M 7 R F";
    const validSearchTerm5 = "EC4M7Rf";
    const validSearchTerm6 = "ec4m7rf";
    const validSearchTerm7 = "CT1 2EH";
    const validSearchTerm8 = "BS1 4DJ";
    const validSearchTerm9 = "PL4 0DW";
    const validSearchTerm10 = "G3 8AG";
    const validSearchTerm11 = "BN1 1AE";
    const validSearchTerm12 = "M16 0RA";
    const validSearchTerm13 = "L4 0TH";

    const invalidSearchTerm1 = "SE11";
    const invalidSearchTerm2 = "SE 11";
    const invalidSearchTerm3 = "S E 1 1";
    const invalidSearchTerm4 = "EC4M7R";
    const invalidSearchTerm5 = "EC4M";
    const invalidSearchTerm6 = "E";
    const invalidSearchTerm7 = "%";
    const invalidSearchTerm8 = "EC4M7R#";
    const invalidSearchTerm9 = "1C4M7RF";
    const invalidSearchTerm10 = "EC4M7RF3";
    const invalidSearchTerm11 = "fds3f4edf";
    const invalidSearchTerm12 = "151DEN U8";
    const invalidSearchTerm13 = "@#f8dNU8";
    const invalidSearchTerm14 = "1df83did djf83j932nfdiow8ff3f";
    const invalidSearchTerm15 = "";
    const invalidSearchTerm16 = " ";
    const invalidSearchTerm17 = "\n";

    it('Test for valid UK postcodes', () => {
        expect(isValidUKPostcode(validSearchTerm1)).toBe(true);
        expect(isValidUKPostcode(validSearchTerm2)).toBe(true);
        expect(isValidUKPostcode(validSearchTerm3)).toBe(true);
        expect(isValidUKPostcode(validSearchTerm4)).toBe(true);
        expect(isValidUKPostcode(validSearchTerm5)).toBe(true);
        expect(isValidUKPostcode(validSearchTerm6)).toBe(true);
        expect(isValidUKPostcode(validSearchTerm7)).toBe(true);
        expect(isValidUKPostcode(validSearchTerm8)).toBe(true);
        expect(isValidUKPostcode(validSearchTerm9)).toBe(true);
        expect(isValidUKPostcode(validSearchTerm10)).toBe(true);
        expect(isValidUKPostcode(validSearchTerm11)).toBe(true);
        expect(isValidUKPostcode(validSearchTerm12)).toBe(true);
        expect(isValidUKPostcode(validSearchTerm13)).toBe(true);
    });

    it('Test for invalid UK postcodes', () => {
        expect(isValidUKPostcode(invalidSearchTerm1)).toBe(false);
        expect(isValidUKPostcode(invalidSearchTerm2)).toBe(false);
        expect(isValidUKPostcode(invalidSearchTerm3)).toBe(false);
        expect(isValidUKPostcode(invalidSearchTerm4)).toBe(false);
        expect(isValidUKPostcode(invalidSearchTerm5)).toBe(false);
        expect(isValidUKPostcode(invalidSearchTerm6)).toBe(false);
        expect(isValidUKPostcode(invalidSearchTerm7)).toBe(false);
        expect(isValidUKPostcode(invalidSearchTerm8)).toBe(false);
        expect(isValidUKPostcode(invalidSearchTerm9)).toBe(false);
        expect(isValidUKPostcode(invalidSearchTerm10)).toBe(false);
        expect(isValidUKPostcode(invalidSearchTerm11)).toBe(false);
        expect(isValidUKPostcode(invalidSearchTerm12)).toBe(false);
        expect(isValidUKPostcode(invalidSearchTerm13)).toBe(false);
        expect(isValidUKPostcode(invalidSearchTerm14)).toBe(false);
        expect(isValidUKPostcode(invalidSearchTerm15)).toBe(false);
        expect(isValidUKPostcode(invalidSearchTerm16)).toBe(false);
        expect(isValidUKPostcode(invalidSearchTerm17)).toBe(false);
    });
});

describe('Get restaurant address', () => {
    const restaurantAddress1 = {
        firstLine: "123 Main St",
        postalCode: "EC4M7RF",
        city: "London"
    }
    const restaurantAddress2 = {
        firstLine: "1 Hampton St",
        postalCode: "Y3 8AG",
        city: "Bristol"
    }
    const restaurantAddress3 = {
        firstLine: "",
        postalCode: "Y3 8AG",
        city: "Bristol"
    }
    const restaurantAddress4 = {
        firstLine: "1 Hampton St",
        postalCode: "",
        city: ""
    }
    const restaurantAddress5 = {
        firstLine: "1 Hampton St",
        postalCode: "",
        city: "Bristol"
    }
    const restaurantAddress6 = {
        firstLine: "1 Hampton St",
        postalCode: "Y3 8AG",
        city: ""
    }

    const restaurantAddress7 = {
        firstLine: "",
        postalCode: "Y3 8AG",
        city: ""
    }
    const restaurantAddress8 = {
        firstLine: "",
        postalCode: "",
        city: "Manchester"
    }
    const restaurantAddress9 = {
        firstLine: "",
        postalCode: "",
        city: ""
    }

    it('get restaurant address as string', () => {
        expect(getRestaurantAddrAsString(restaurantAddress1)).toBe("123 Main St, EC4M7RF, London");
        expect(getRestaurantAddrAsString(restaurantAddress2)).toBe("1 Hampton St, Y3 8AG, Bristol");
        expect(getRestaurantAddrAsString(restaurantAddress3)).toBe("Y3 8AG, Bristol");
        expect(getRestaurantAddrAsString(restaurantAddress4)).toBe("1 Hampton St");
        expect(getRestaurantAddrAsString(restaurantAddress5)).toBe("1 Hampton St, Bristol");
        expect(getRestaurantAddrAsString(restaurantAddress6)).toBe("1 Hampton St, Y3 8AG");
        expect(getRestaurantAddrAsString(restaurantAddress7)).toBe("Y3 8AG");
        expect(getRestaurantAddrAsString(restaurantAddress8)).toBe("Manchester");
        expect(getRestaurantAddrAsString(restaurantAddress9)).toBe("");
    });
});

describe('Get cuisines', () => {
    const cuisines1 = ["Chinese", "Indian", "Italian", "Pizza"];
    const cuisines2 = ["Chinese", "Indian", "Italian", "Pizza", "Deals", "Low Delivery Fee", "Freebies", "Collect Stamps"];
    const cuisines3 = ["chinese", "indian", "pizza", "italian", "deals", "burgers", "low delivery fee"];
    const cuisines4 = ["Deals", "Low Delivery Fee", "Freebies", "Collect Stamps"];
    const cuisines5 = ["Deals", "Low Delivery Fee", "Freebies", "Collect Stamps", "Burgers"];
    const cuisines6 = ["Deals", "Low Delivery Fee", "Freebies", "Collect Stamps", "Burgers", "Chinese"];
    const cuisines7 = ["Deals", "Low Delivery Fee", "Freebies", "Collect Stamps", "Burgers", "Chinese", "Indian"];
    const cuisines8 = [];
    const cuisines9 = ["Indian"];
    const cuisines10 = ["Indian", "Indian"];
    const cuisines11 = ["Deals", "Deals", "Freebies", "Collect Stamps"];
    const cuisines12 = ["basketball", "football"];


    it('filter for cuisines', () => {
        expect(getActualCuisinesAsString(cuisines1)).toBe("Chinese, Indian, Italian, Pizza");
        expect(getActualCuisinesAsString(cuisines2)).toBe("Chinese, Indian, Italian, Pizza");
        expect(getActualCuisinesAsString(cuisines3)).toBe("chinese, indian, pizza, italian, burgers");
        expect(getActualCuisinesAsString(cuisines4)).toBe("");
        expect(getActualCuisinesAsString(cuisines5)).toBe("Burgers");
        expect(getActualCuisinesAsString(cuisines6)).toBe("Burgers, Chinese");
        expect(getActualCuisinesAsString(cuisines7)).toBe("Burgers, Chinese, Indian");
        expect(getActualCuisinesAsString(cuisines8)).toBe("");
        expect(getActualCuisinesAsString(cuisines9)).toBe("Indian");
        expect(getActualCuisinesAsString(cuisines10)).toBe("Indian, Indian");
        expect(getActualCuisinesAsString(cuisines11)).toBe("");
        expect(getActualCuisinesAsString(cuisines12)).toBe("basketball, football");
    });
});


// TODO: test for proessRestaurans