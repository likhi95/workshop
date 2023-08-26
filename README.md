# Getting started with creating a WORKSHOP project. 
## As project is divided into 2 branches one with static data(MAIN BRANCH) and other one with API integration.
## Lets start with appication with the static data.
-download the project and extract into yoour system.
-open the project in vs code env.
-in the tabs section, open the terminal, write the below command to run the application.

##npm start 
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser. 

# Detail about the project Structure 
- as project is having a folder structure like this.
      - node_modulus
      - public
      - src
      - gitignore
      - package-lock.json
      - package.json
      - README.md
      - tsconfig.json

- the package.json: this is all about the project dependency file.
- src
  >components
    > Layout
    > Login
    > Study plan detail
    > Study plan list
    > userlist

  these are the 5 components of the project, these are all the page designs with integrations.
  As we know react is all about reusable components. Here in our application is having multipages , so in components section as you can see all the pages , then added into one single file to run the application.

-index.tsx : this is the main file to run the application , where all the components are called here as you can see in the code, all the components are imported on that file like eg: import Login from './components/Login/Login'; 

- in this file all components are wrapperd with routing along with path, this is load the page along with the path. so initially when you run the application , the login page will be rendering.
- 
- then in the url path:http://localhost:3000/admin = dashboard page will render.Similarly for user-list and study-plan.
- http://localhost:3000/admin/user-list 
- http://localhost:3000/admin/study-plan


  ## Using static data
  
  - open the userlist.tsx under the components section , userlist.
      >components
        >userlist
          >userlist.tsx

  - as you can see the users data is given statically , that data is rendering in your application.
  - The users data where its having array of objects.


## using API data rendering 
-download the fully integrated app from the different batch , extract into your system.
-open in vs code env.

as this application code is fully integrated with API's. As data is called using API. for all the sections, check the code for your reference.

as in this both the branches application was created, with all the html boiler code with functionalities and api integration. 

now lets create an application from scratch. close all the current existing tabs. 

# Steps to create a new application.  
# Getting Started with Create React App

-open your visual code env.
-in the tabs section , open the terminal , write this below command to create inital react application
## npx create-react-app projectname --template typescript

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## create one components folder structre , inside the component make one sample folder with its css file.
> src
   > components
      >sample
         > sample.tsx
         > sample.css

in sample.tsx create one function write some html elements inside of component.

### Eg:
sample.tsx
import React from 'react'

function sample() {
  return (
    <div>
        <h1 className="heading">Sample</h1>
    </div>
  )
}


export default sample

sample.css  give some styling for that element 
.heading{
    text-align: center;
    font-size: 30px;
    color: blue;
}


now lets import that componenet file in app.tsx 
import React from 'react';
import './App.css';
import Sample from './sample/sample';

function App() {
  return (
    <div>
      <Sample/>
    </div>
  );
}

export default App;


run the application by using npm start command in your terminal.


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
