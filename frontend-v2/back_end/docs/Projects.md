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


## <span style="color:deepskyblue"> createNewProject
Creates a new project and saves its information to the database. Returns a Boolean value based on the success of the project creation.

* **Function Call:** createNewProject(project)

* **Params: (project: {...})**

    | Name         | Type    | Description                                             | Default                 |
    | ------------ | ------- | ------------------------------------------------------- | ----------------------- |
    | `Category`   | String  | Project Category/Type.                       | NONE (Required Param)   |
    | `Completed`  | Boolean | If the project was successfully completed.   | NONE (Required Param)   |
    | `Description`| String  | Description of the project.                  | NONE (Required Param)   |
    | `End_Date`   | DateString | The project termination date.               | NONE (Required Param)   |
    | `Git_Link`   | String  | Github link to the project's repo.           | NONE (Required Param)   |
    | `Image`      | Blob    | Project Logo.                                | NONE (Required Param)   |
    | `Members`    | String  | Comma-separated array. Members that were part of the project.  | NONE (Required Param)   |
    | `Name`       | String  | Project Name (also the key).                 | NONE (Required Param)   |
    | `PM`         | String  | Name of the project manager.                 | NONE (Required Param)   |
    | `Start_Date` | DateString | The date when the project started.          | NONE (Required Param)   |

* **Returned Data Format:** Boolean

* **Success Response:**
```
true
```


* **Error Response:**
```
false
```

