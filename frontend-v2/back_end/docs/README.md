** Note: All functions will handle errors by logging the error to console, and then returning an error object.

** We can send the actual error message in the object (this is optimal in API structuring), but in our informal case we'll just log it so it's easier to read..

General README for these functions... we can fill it out at some point @Ben
But for now I will use this as a TODO list.

Ben:
- Return active club leads              (Done)
- Return shortened form of projects     (Done)
- Endpoint Documentation                (Done)

Frank:
- Return old events / upcoming events   (Done)
- Return details for projects           (This PR)
- Return all currently active projects  (Done)
- Endpoint Documentation                (TODO)

General:
- Refactoring code, we need to split up the `end_points.js` file into three files. More on this after we're done with the main features (low on priority)