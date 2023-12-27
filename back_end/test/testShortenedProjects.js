import { assert } from "chai";
import { getShortenedProject } from "../api/projects.js";

describe("Testing Get Shortened Project Functions.", () => {
    it("Shortened Project", async () => {
        const rsp = await getShortenedProject("Test/Projects");
        const expected = [
            { Name: "Project1", Description: "testdesc", Image: "Image" },
            { Name: "Project2", Description: "TestDesc", Image: "Image" },
        ];
        assert.deepEqual(rsp, expected);
    });
});
