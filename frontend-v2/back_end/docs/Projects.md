## <span style="color:deepskyblue">Projects Data Endpoints</span>
Documentation for all callable back-end functions related to Projects data

## <span style="color:deepskyblue"> getShortenedProject
Returns all projects in shortened form (Name, Description, Image).

* **Function Call:** getShortenedProject()

* **Returned Data Format:** List

* **Success Response:** <br>
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


## <span style="color:deepskyblue"> getActiveProjects
Gets projects based on if they are active (i.e. currently working).

* **Function Call:** getShortenedProject(active)


* **Params:**

    | Name     | Type    | Description                                     | Default    |
    | -------- | ------- | ----------------------------------------------- | ---------- |
    | `active` | boolean | True for active projects, false for inactive    | true       |

* **Returned Data Format:** List

* **Success Response:** <br>
Sample response shows output format, followed by sample data.
  ```
  [
    {
      "Category": String,
      "Completed": boolean,
      "Description": String,
      "End_Date": DateString,
      "Git_Link": String:Link,
      "Image": Blob,
      "Members": Comma-separated array,
      "Name": String,
      "PM": String,
      "Start_Date": DateString
    }
    {
      Category: 'Web_project',
      Completed: true,
      Description: 'TestDesc',
      End_Date: '2022-5-12T00:00-07:00',
      Git_link: 'link',
      Image: 'Image',
      Members: 'Billy,Joe',
      Name: 'Project2',
      PM: 'Joe',
      Start_Date: '2021-8-24T00:00-07:00'
    }
    ...
  ]
  ```

## <span style="color:deepskyblue"> getProjectByName
Get detailed project information based on the project name

* **Function Call:** getProjectByName(name)

* **Params:**

    | Name   | Type    | Description                                     | Default                 |
    | ------ | ------- | ----------------------------------------------- | ----------------------- |
    | `name` | String  | The name of the project that is being requested | NONE (Required Param)   |

* **Returned Data Format:** List

* **Success Response:** <br>
Sample response shows output format, followed by sample data. (for name = "Project2")
  ```
  [
    {
      "Category": String,
      "Completed": boolean,
      "Description": String,
      "End_Date": DateString,
      "Git_Link": String:Link,
      "Image": Blob,
      "Members": Comma-separated array,
      "Name": String,
      "PM": String,
      "Start_Date": DateString
    }
    {
      Category: 'Web_project',
      Completed: true,
      Description: 'TestDesc',
      End_Date: '2022-5-12T00:00-07:00',
      Git_link: 'link',
      Image: 'Image',
      Members: 'Billy,Joe',
      Name: 'Project2',
      PM: 'Joe',
      Start_Date: '2021-8-24T00:00-07:00'
    }
    ...
  ]
  ```

* **Error Response:**
  Errors will be outputted into console

* **Error Response:**
  Errors will be outputted into console
