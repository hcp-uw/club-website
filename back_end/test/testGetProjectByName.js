import { assert } from "chai";
import { getProjectByName } from "../api/projects.js";
import { errObj } from "../utils/utils.js";

describe("Testing Get Active Projects.", () => {
    it("Test Project1", async () => {
        const rsp = await getProjectByName("Project1", "Test/Projects");
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

    it("Test Project2", async () => {
        const rsp = await getProjectByName("Project2", "Test/Projects");
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

    it("Test Undefined Input", async () => {
        // Something should print to console error here
        const rsp = await getProjectByName(undefined, "Test/Projects");
        assert.deepEqual(rsp, errObj);
    });

    it("Test Bad Input Type", async () => {
        // Something should print to console error here
        const rsp = await getProjectByName(false, "Test/Projects");
        assert.deepEqual(rsp, errObj);
    });

    it("Test Project Not Exist", async () => {
        const rsp = await getProjectByName(
            "somebody_once_told_me_wu_smells",
            "Test/Projects",
        );
        assert.deepEqual(rsp, []);
    });
});
