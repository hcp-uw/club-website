import { getLeads, createNewLead } from "../api/leads.js";
import { getAllEvents, createNewEvent, deleteEvent } from "../api/events.js";
import { getProjects, createNewProject } from "../api/projects.js";
import { assert } from "chai";

describe("Testing createNewEvent", () => {
  afterEach(async () => {
    // Cleanup step: Delete the event created during testing
    await deleteEvent("Event5", "Test/Events");
  });

  it("should create a new event and return true", async () => {
    const event =  {
        Attendees: 69,
        Date: "2007-10-20T16:00-07:00",
        Description: "This is a dope event",
        Image: "blob",
        Location: "UW",
        Name: "Event5",
        Sponsor: "Google",
    };

    const result = await createNewEvent(event, "Test/Events");
    assert.isTrue(result, "Expected createNewEvent to return true");
  });

  it("should return false when required parameters are missing", async () => {
    const event = {
      Attendees: 50,
      Date: "2023-08-01T16:00-07:00",
      // Missing 'description', 'imageURL', 'location', 'name', 'sponser'
    };

    const result = await createNewEvent(event, "Test/Events");
    assert.isFalse(result, "Expected createNewEvent to return false");
  });

  it("should return false when 'Attendees' parameter is not a number", async () => {
    const event = {
      Attendees: "Not a number", // Invalid 'Attendees' type
      Date: "2023-08-02T16:00-07:00",
      Description: "Another test event",
      ImageURL: "https://example.com/another-image.jpg",
      Location: "Another Location",
      Name: "Another Test Event",
      Sponser: "Another Test Sponser",
    };

    const result = await createNewEvent(event, "Test/Events");
    assert.isFalse(result, "Expected createNewEvent to return false");
  });

  // Add more test cases for other type checks and scenarios if needed
});
