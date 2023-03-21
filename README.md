# Pick My GIFs

The objective of this project is to create a single page application where users can add GIFs to their library. Upon arrival on the page, users will find a form to search for GIFs, after a search the user will see  a modal that allows them to view the most relevant GIFs returned in an infinite scroll, and a "heart" button to add selected GIFs to their library.
A "My GIFs" block displays a list of GIFs that the user has selected and added to their library.

This project was developed using React (via create-react-app), and the MUI library. To run the project, clone the repository, install the dependencies, and start the development server. Detailed instructions can be found in the "Installation and Setup" section of this README.

Note: this project does not use JWT authentication and instead uses json-server for user management; the data is not secured so do not use sensitive information.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Prerequisites
Node.js (v12 or higher) installed on your local machine
NPM package manager (v6 or higher)
JSON server installed globally npm install -g json-server
Command to run JSON server:

``` npm run json-server ``` (this will start the server on http://localhost:4000)

### Installation and Setup

1. Clone the repository:

```git clone https://github.com/<your-username>/pick-my-gifs.git```

2. Navigate to the project directory

``` cd pick-my-gifs ```

3. Install dependencies:

``` npm install ```

4. Go to the Giphy Developers page (https://developers.giphy.com/) and create an account.

    Follow the instructions to create a new app and obtain an API key.

    Create a new file in the root of your project directory and name it .env.

    Open the .env file and add your environment variables in this format:

     VARIABLE_NAME=variable_value. 

    ``` 
    REACT_APP_GIPHY_API_BASE_URL=https://api.giphy.com/v1/gifs

    REACT_APP_GIPHY_API_KEY=YOUR_API_KEY_HERE
    ```

    Make sure to replace YOUR_API_KEY_HERE with the API key you obtained from Giphy.

    Save the changes to the .env file.

5. Start the JSON server

``` npm run json-server ```

6. In a separate terminal tab, start the development server:

``` npm start ```

7. Open your browser and navigate to http://localhost:3000 to view the app.


## Built With
- React
- MUI
- Giphy API
- json-server

## Authors

- Noureddine RAKMANI ](https://github.com/Stagiaire-Noureddine)

## Acknowledgments

Giphy API - The GIF search API used
create-react-app - The React project boilerplate used
Material-UI - The React UI framework used
