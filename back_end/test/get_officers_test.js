import { getOfficers,getEvents,getProjects } from "../api/end_points.js";

it('get Officers',async () => {
  let rsp = await getOfficers();
  console.log(rsp)
})

it('get Events', async () => {
  let rsp = await getEvents();
})

it('get Projects', async () => {
  let rsp = await getProjects();
})