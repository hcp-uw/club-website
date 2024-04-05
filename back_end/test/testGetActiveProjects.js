import { assert } from "chai";
import { getActiveProjects } from "../api/projects.js";

describe("Testing Get Active Projects.", () => {
    it("Active", async () => {
        const rsp = await getActiveProjects(true, "Test/Projects");
        const expected = [
            {
                Category: "Web_Project",
                Completed: false,
                Description: "testdesc",
                End_Date: "",
                Git_Link: "link",
                Image: "Image",
                Members: "Billy",
                Name: "Project1",
                PM: "Billy",
                Start_Date: "2020-8-24T00:00-07:00",
            },
        ];
        assert.deepEqual(rsp, expected);
    });

    it("Inactive", async () => {
        const rsp = await getActiveProjects(false, "Test/Projects");
        const expected = [
            {
                Category: "Web_project",
                Completed: true,
                Description: "TestDesc",
                End_Date: "2022-5-12T00:00-07:00",
                Git_link: "link",
                Image: "Image",
                Members: "Billy,Joe",
                Name: "Project2",
                PM: "Joe",
                Start_Date: "2021-8-24T00:00-07:00",
            },
        ];
        assert.deepEqual(rsp, expected);
    });
});
