import { getActiveLeads } from "../api/leads.js";
import { assert } from "chai";

describe("Testing Get Active Leads Functions.", () => {
    it("Active Leads", async () => {
        let rsp = await getActiveLeads("Test/Club_Leads");
        let expected = [
            {
                Active: true,
                Class_Standing: "Senior",
                Date_Joined: "6/30/2021",
                Date_Left: "NA",
                Email: "something@gmail.com",
                Image: "NA",
                Name: "Billy",
                Role: "Co-Chair",
                Team: "Project1",
            },
        ];
        assert.deepEqual(rsp, expected);
    });
});
