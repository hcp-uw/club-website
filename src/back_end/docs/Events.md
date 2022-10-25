## <span style="color:deepskyblue">Events Data Endpoints</span>
Documentation for all callable back-end functions related to Events data

## <span style="color:deepskyblue"> getEventsBasedOnTime
Gets events based on the current date/time. Returns the output as a list, sorted in ascending order by date (closest to today first)

* **Function Call:** getEventsBasedOnTime(upcoming, verbose)

* **Params:**

    | Name       | Type    | Description                                               | Default                 |
    | ---------- | ------- | --------------------------------------------------------- | ----------------------- |
    | `upcoming` | Boolean | Indicates querying for upcoming events (Alternative: old) | NONE (Required Param)   |
    | `limit`    | Integer | Indicates the number of events to return                  | 4 (Optional Param)      |

* **Returned Data Format:** List

* **Success Response:** <br>
Sample response shows output format, followed by sample data.
  ```
  [
    {
      Attendees: <int>,
      Date: <DateString>,
      Description: <String>,
      Image: <URL>,
      Location: <String>,
      Name: <String>m
      Sponsor: <String>
    },
    {
      Attendees: 21,
      Date: '2192-10-20T16:00-07:00',
      Description: 'This is an event in the future',
      Image: 'blob (do not use, not yet implemented)',
      Location: 'UW?',
      Sponsor: 'Tettie'
    },
    ...
  ]
  ```

* **Error Response:**
  Errors will be outputted into console
