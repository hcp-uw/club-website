import { ref, get } from "firebase/database";
import { database } from "./index.js";

// Returns all Data passed through the queryString
// @Params queryString - String of the Query
export async function getData(queryString) {
    const query = await ref(database, queryString);
    const qResult = await get(query);
    const data = qResult.val();
    return data;
}

// Error object for the API
export const errObj = {
    error: "Error occured, please check console!",
};
