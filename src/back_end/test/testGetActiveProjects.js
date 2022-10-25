import { getActiveProjects } from "../api/end_points.js";
import {assert} from 'chai';

describe("Testing Get Active Projects.", () => {
  it('Active',async () => {
    let rsp = await getActiveProjects(true, "Test/Projects");
    let expected = [
      {
        Category: 'Web_Project',
        Completed: false,
        Description: 'testdesc',
        End_Date: '',
        Git_Link: 'link',
        Image: 'Image',
        Members: 'Billy',
        Name: 'Project1',
        PM: 'Billy',
        Start_Date: '1/1/2001'
      }
    ];
    assert.deepEqual(rsp, expected);
  })

  it('Inactive',async () => {
    let rsp = await getActiveProjects(false, "Test/Projects");
    let expected = [
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
        Start_Date: '1/1/2020'
      }
    ];
    assert.deepEqual(rsp, expected);
  })
})