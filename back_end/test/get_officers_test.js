import { getData } from "../api/end_points.js";

it('get Officers',async () => {
  let rsp = await getData("Club_Leads");
  console.log(rsp)
})

it('get Events', async () => {
  let rsp = await getData("Events");
  console.log(rsp)
})

it('get Projects', async () => {
  let rsp = await getData("Projects");
  console.log(rsp)
})