import {
    ref,
    query,
    get,
    orderByChild,
    startAt,
    endAt,
    limitToFirst,
    limitToLast,
} from "firebase/database";
import { database } from "../utils/index.js";
import { errObj, getData } from "../utils/utils.js";

/* -------------------- Events Endpoints -------------------- */
// Returns all events from database
export async function getAllEvents(test = "Events") {
    let data = await getData(test);
    return Array.from(Object.values(data));
}

/*
 * Returns upcoming events, or old events
 * @Param upcoming (boolean): Indicates getting upcoming events (true) or old events
 * @Param limit (integer): How many events to return, will return events closest to today's date
 *    Optional param: Default value 4
 * @return List of events, sorted in descending order
 */
export async function getEventsBasedOnTime(
    upcoming,
    limit = 4,
    test = "Events",
) {
    let missingParamErrMsg = "missing parameters, please define two booleans";
    let typeErrMsg = "incorrect parameter type, expected boolean, got ";

    // Param checks
    if (upcoming === undefined) {
        console.error(missingParamErrMsg);
        return errObj;
    }
    // Type checks
    if (typeof upcoming !== "boolean") {
        console.error(typeErrMsg + typeof upcoming);
        return errObj;
    }

    // Getting date
    let todayStr = new Date().toISOString(); // YYYY-MM-DDTHH:MM:SS.sssz
    let today = todayStr.substring(0, todayStr.length - 5); // YYYY-MM-DDTHH:MM:SS

    // Creating query
    let qRes;
    let data;
    try {
        let q;
        if (upcoming) {
            // Upcoming events
            q = query(
                ref(database, test),
                orderByChild("Date"),
                startAt(today),
                limitToFirst(limit),
            );
        } else {
            // Old events
            q = query(
                ref(database, test),
                orderByChild("Date"),
                endAt(today),
                limitToLast(limit),
            );
        }
        qRes = await get(q);
        data = qRes.val();
        if (data === null) {
            return [];
        }
    } catch (err) {
        console.error(err);
        return errObj;
    }

    // Sorting and outputting the results
    let values = Array.from(Object.values(data));
    if (values.length > 1) {
        values.sort(function (a, b) {
            return new Date(a.Date) - new Date(b.Date);
        });
    }
    return values;
}
