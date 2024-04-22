import {isValidUKPostcode} from "../../src/utils/util";

describe('ValidPostCode', () => {
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