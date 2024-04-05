import { test } from "node:test";
import { assert } from "chai";
import { testRef } from "../api/image.js";

describe("testRef", () => {
    it("should return a valid reference", () => {
        testRef();
        assert.equal(1, 1);
    });
});
