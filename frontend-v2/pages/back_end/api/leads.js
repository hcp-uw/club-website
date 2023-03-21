import { ref, query, get, orderByChild, equalTo } from "firebase/database";
import { database } from "../utils/index.js";
import { errObj, getData } from "../utils/utils.js";

/* -------------------- Leads Endpoints --------------------- */
// Returns all club leads from database
export async function getLeads(test = "Club_Leads") {
    let data = await getData(test);
    return Array.from(Object.values(data));
}

/*
 * Returns all Active Club_Leads
 */
export async function getActiveLeads(test = "Club_Leads") {
    let qRes;
    let data;
    try {
        let q = query(
            ref(database, test),
            orderByChild("Active"),
            equalTo(true),
        );
        qRes = await get(q);
        data = qRes.val();
    } catch (err) {
        console.error(err);
        return errObj;
    }
    return Array.from(Object.values(data));
}
