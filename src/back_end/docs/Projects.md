## <span style="color:deepskyblue">Projects Data Endpoints</span>
Documentation for all callable back-end functions related to Projects data

## <span style="color:deepskyblue"> getShortenedProject
Returns all projects in shortened form (Name, Description, Image).

* **Function Call:** getShortenedProject()

* **Returned Data Format:** List

* **Success Response: ()** <br>
Sample response shows output format, followed by sample data.
  ```
  [
    {
      Name: <String>,
      Description: <String>,
      Image: <URL>
    },
    {
      Name: 'Project1',
      Description: 'testdesc',
      Image: 'blob'
    },
    ...
  ]
  ```

* **Error Response:**
  Errors will be outputted into console

