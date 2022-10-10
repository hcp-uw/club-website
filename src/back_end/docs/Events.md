## <span style="color:deepskyblue">Events Data Endpoints</span>
Documentation for all callable back-end functions related to Events data

## <span style="color:deepskyblue"> getEventsBasedOnTime
Gets events based on the current date/time. Returns the output as a list, sorted in ascending order by date (closest to today first)

* **Function Call:** getEventsBasedOnTime(upcoming, verbose)

* **Params:**

    | Name       | Type    | Description                                               | Default                 |
    | ---------- | ------- | --------------------------------------------------------- | ----------------------- |
    | `upcoming` | Boolean | Indicates querying for upcoming events (Alternative: old) | NONE (Required Param)   |
    | `verbose`  | Boolean | Indicates returning all data (Alternative: just the name) | NONE (Required Param)   |

* **Returned Data Format:** List

* **Success Response: (verbose)** <br>
Sample response shows output format, followed by sample data.
  ```
  [
    {
      key: <String>,
      value: {
        Attendees: <int>,
        Date: <DateString>,
        Description: <String>,
        Image: <URL>,
        Location: <String>,
        Sponsor: <String>
      }
    },
    {
      key: 'EventFuture',
      value: {
        Attendees: 21,
        Date: '2192-10-20T16:00-07:00',
        Description: 'This is an event in the future',
        Image: 'blob (do not use, not yet implemented)',
        Location: 'UW?',
        Sponsor: 'Tettie'
      }
    },
    ...
  ]
  ```
* **Success Response: (non-verbose)**
  ```
  ["Event1", ...] <String[]>
  ```

* **Error Response:**
  Errors will be outputted into console
