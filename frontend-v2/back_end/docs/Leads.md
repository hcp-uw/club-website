## <span style="color:deepskyblue">Leads Data Endpoints</span>
Documentation for all callable back-end functions related to Leads data

## <span style="color:deepskyblue"> getActiveLeads
Returns all club leads (and information associated) that are currently active.

* **Function Call:** getActiveLeads()

* **Returned Data Format:** List

* **Success Response: ()** <br>
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

* **Error Response:**
  Errors will be outputted into console

