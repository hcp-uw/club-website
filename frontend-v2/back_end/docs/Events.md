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
      Name: <String>,
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


## <span style="color:deepskyblue"> createNewEvent
Creates a new event and saves it to our DB. Returns a Boolean value based that corresponds to the success of the event creation

* **Function Call:** createNewEvent(event)

* **Params: (event: {...})**

    | Name       | Type    | Description                                               | Default                 |
    | ---------- | ------- | --------------------------------------------------------- | ----------------------- |
    | `attendees` | Integer | Number of planned attendees | NONE (Required Param) |
    | `date`    | DateString | Date of the event | NONE (Required Param) |
    | `description` | String | Description of the event | NONE (Required Param) |
    | `imageURL`  | URL | Hosted URL of the image | NONE (Required Param) |
    | `location`| String | Location of the event | NONE (Required Param) |
    | `name` | String | Name of the event, also serving as the "unique identifier" | NONE (Required Param) |
    | `sponser` | String | Name of the event's sponser | NONE (Required Param) |

* **Returned Data Format:** Boolean

* **Success Response:** <br>
  ```
  true
  ```

* **Error Response:**

  ```
  false
  ```


## <span style="color:deepskyblue"> deleteEvent
Deletes an event from the database based on its event name. Returns a Boolean value indicating the success of the deletion.

* **Function Call:** deleteEvent(eventName)

* **Params: (eventName: String)**

    | Name        | Type   | Description                                  | Default                 |
    | ----------- | ------ | -------------------------------------------- | ----------------------- |
    | `eventName` | String | The name of the event to be deleted. | NONE (Required Param) |

* **Returned Data Format:** Boolean

* **Success Response:**
```
true
```

* **Error Response:**
```
false
```

## <span style="color:deepskyblue"> updateEvent
Updates an event in the database based on the provided event name, key name, and value.

* **Function Call:** updateEvent(eventName, key, value)

* **Params:**

    | Name        | Type   | Description                                    | Default                 |
    | ----------- | ------ | ---------------------------------------------- | ----------------------- |
    | `eventName` | String | The name of the event to be updated. (Required) | NONE (Required Param)   |
    | `key`       | String | The key name of the field to be updated. (Required) | NONE (Required Param)   |
    | `value`     | Any    | The new value to update the field with. (Required) | NONE (Required Param)   |

* **Returned Data Format:** Boolean

* **Success Response:**
```
true
```

* **Error Response:**
```
false
```


