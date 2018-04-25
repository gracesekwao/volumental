# Volumental Shoe Sizes Application
## Installation
Prerequisite: The application requires the installation of Node 8.3 at least in order to run it.
The application can be run and compiled by following the steps below:
  - Import the folder,  open the Terminal and navigate to the directory of your folder
  - Install the node dependencies by using 'npm install'
  - Run the application by using 'npm run start'
  - Use the URL http://localhost:8080/ to access the application

## Application Set Up

The application is written in React 16 together with Redux to handle the state management. It also uses React-Router-DOM to handle routing within the application. The application also uses Webpack to bundle and compile all the assets in the application. Other setup methods are described as follows:
  - Babel 6 is used to process the JavaScript code and its extension babel-polyfill and polyfilling are used to handle Promises.
  - SASS, PostCSS and Autofixer are used to handle styling of the application
  - ESLint and their corresponding plugins are used to automatically check the styling of the code and detect if there are any mistakes and if there are any inconsistencies
  - The application is written in ES6
  - The application is uses d3.js for data visualization


### Main Page
The main page of the application can be found in the client folder under main/MainView.js. This is where the header and the body of the application is called upon

### Application Architecture
As mentioned earlier, this application is developed by using a combination of both React & Redux. Thus, the JS files are separated as as follows:

  - client/main - This is the main file of the application also known as the smart component
  - client/components - These are the dummy components
  - client/containers - This contains container components that has access to the store and/or redux actions for state management

There is also a redux folder that contains the actions, reducer and store modules for the redux and to handle data fetching from the API.

Axios is used for data fetching to save development time.

>
