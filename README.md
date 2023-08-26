# Getting started with creating a WORKSHOP project. 
## As project is divided into 2 branches one with static data(MAIN BRANCH) and other one with API integration.
## Lets start with appication with the static data.
-download the project and extract into yoour system.
-open the project in vs code env.
-in the tabs section, open the terminal, write the below command to run the application.

##npm start 
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser. 

#Detail about the project Structure 
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


    







# Getting Started with Create React App

-open your visual code env.
-in the tabs section , open the terminal , write this below command to create inital react application
## npx create-react-app projectname --template typescript


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
