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
    let q = query(ref(database, test), orderByChild("Active"), equalTo(true));
    qRes = await get(q);
    data = qRes.val();
  } catch (err) {
    console.error(err);
    return errObj;
  }
  return Array.from(Object.values(data));
}

/**
 * Creates a new club lead and saves their information to the database.
 * @param {Object} lead - The lead information to be added to the database.
 * @returns {boolean} Returns true if the lead creation is successful, otherwise false.
 */
async function createNewLead(lead, test = "Club_Leads") {
  try {
    // check if required parameters provided
    const requiredFields = [
      "Active",
      "Class_Standing",
      "Date_Joined",
      "Date_Left",
      "Email",
      "Image",
      "Name",
      "Role",
      "Team",
    ];
    for (const field of requiredFields) {
      if (!lead[field]) {
        console.error(`Missing required parameter: ${field}`);
        return false;
      }
    }

    // get ref to lead in database
    const leadRef = ref(database, `${test}/${lead.Name}`);

    // check if lead already exists
    const snapshot = await leadRef.get();
    if (snapshot.exists()) {
      console.error(
        `Lead with name '${lead.Name}' already exists in the database.`
      );
      return false;
    }

    // Save the lead information to the database
    await set(leadRef, lead);

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

/**
 * Deletes a club lead from the database based on their name.
 * @param {string} leadName - The name of the club lead to be deleted.
 * @returns {boolean} Returns true if the lead deletion is successful, otherwise false.
 */
async function deleteClubLead(leadName, test = "Club_Leads") {
  try {
    // check if leadName is provided
    if (!leadName) {
      console.error("Missing required parameter: leadName");
      return false;
    }

    // get ref to lead in database
    const leadRef = ref(database, `${test}/${leadName}`);

    // check if lead exists
    const snapshot = await leadRef.get();
    if (!snapshot.exists()) {
      console.error(`Lead with name '${leadName}' not found in the database.`);
      return false;
    }

    // delete lead from database
    await remove(leadRef);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}
