import { getData } from "../utils/utils.js";

// Returns all club leads from database
export async function getLeads(test = "Club_Leads") {
  let data = await getData(test);
  return data;
}

// Returns all events from database
export async function getEvents(test = "Events") {
  let data = await getData(test);
  return data;
}

// Returns all projects from database
export async function getProjects(test = "Projects") {
  let data = await getData(test);
  return data;
}