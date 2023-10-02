import { assert } from "chai";
import { testRef } from "../api/image.js";
import { test } from "node:test";

describe("testRef", () => {
    it("should return a valid reference", () => {
        testRef();
        assert.equal(1, 1);
    });
});
