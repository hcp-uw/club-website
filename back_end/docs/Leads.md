## <span style="color:deepskyblue">Leads Data Endpoints</span>

Documentation for all callable back-end functions related to Leads data

## <span style="color:deepskyblue"> getActiveLeads

Returns all club leads (and information associated) that are currently active.

* __Function Call:__ getActiveLeads()

* __Returned Data Format:__ List

* __Success Response: ()__ <br>
  Sample response shows output format, followed by sample data.
  ```
  [
    {
      Active: <Boolean>,
      Class_Standing: <String>,
      Date_Joined: <DateString>,
      Date_Left: <DateString>,
      Email: <String>,
      Image: <URL>,
      Name: <String>,
      Role: <String>,
      Team: <String>
    },
    {
      Active: true,
      Class_Standing: 'Senior',
      Date_Joined: '6/30/2021',
      Date_Left: 'NA',
      Email: 'something@gmail.com',
      Image: 'NA',
      Name: 'Billy',
      Role: 'Co-Chair',
      Team: 'Project1'
    },
    ...
  ]
  ```

* __Error Response:__
  Errors will be outputted into console

## <span style="color:deepskyblue"> createNewLead

Creates a new club lead and saves their information to the database. Returns a Boolean value based on the success of the lead creation.

* __Function Call:__ createNewLead(lead)

* __Params: (lead: {...})__

  | Name             | Type       | Description                                              | Default               |
  | ---------------- | ---------- | -------------------------------------------------------- | --------------------- |
  | `Active`         | Boolean    | Indicates if the club lead is currently active.          | NONE (Required Param) |
  | `Class_Standing` | String     | Indicates their year (freshman/sophomore/junior/senior). | NONE (Required Param) |
  | `Date_Joined`    | DateString | Indicates the date they joined the leads team.           | NONE (Required Param) |
  | `Date_Left`      | DateString | Indicates the date they left the leads team.             | NONE (Required Param) |
  | `Email`          | String     | Their UW email.                                          | NONE (Required Param) |
  | `Image`          | Blob       | Their picture.                                           | NONE (Required Param) |
  | `Name`           | String     | Their name (also the key).                               | NONE (Required Param) |
  | `Role`           | String     | Their position/role, i.e. which lead team they were on.  | NONE (Required Param) |
  | `Team`           | String     | Comma-separated Array. The project teams they were in.   | NONE (Required Param) |

* __Returned Data Format:__ Boolean

* __Success Response:__

```
true
```

* __Error Response:__

```
false
```

## <span style="color:deepskyblue"> deleteClubLead

Deletes a club lead from the database based on their name. Returns a Boolean value indicating the success of the lead deletion.

* __Function Call:__ deleteClubLead(leadName)

* __Params: (leadName: String)__

  | Name       | Type   | Description                              | Default               |
  | ---------- | ------ | ---------------------------------------- | --------------------- |
  | `leadName` | String | The name of the club lead to be deleted. | NONE (Required Param) |

* __Returned Data Format:__ Boolean

* __Success Response:__

```
true
```

* __Error Response:__

```
false
```

## <span style="color:deepskyblue"> updateClubLead

Updates a club lead's information in the database based on their name, key name, and new value. Returns a Boolean value indicating the success of the update.

* __Function Call:__ updateClubLead(leadName, key, value)

* __Params:__

  | Name       | Type   | Description                                         | Default               |
  | ---------- | ------ | --------------------------------------------------- | --------------------- |
  | `leadName` | String | The name of the club lead to be updated. (Required) | NONE (Required Param) |
  | `key`      | String | The key name of the field to be updated. (Required) | NONE (Required Param) |
  | `value`    | Any    | The new value to update the field with. (Required)  | NONE (Required Param) |

* __Returned Data Format:__ Boolean

* __Success Response:__

```
true
```

* __Error Response:__

```
false
```
