import { getShortenedProject } from "../api/projects.js";
import { assert } from "chai";

describe("Testing Get Shortened Project Functions.", () => {
    it("Shortened Project",async () => {
        let rsp = await getShortenedProject("Test/Projects");
        let expected =
      [
          { Name: "Project1", Description: "testdesc", Image: "Image" },
          { Name: "Project2", Description: "TestDesc", Image: "Image" },
      ];
        assert.deepEqual(rsp, expected);
    });
});
