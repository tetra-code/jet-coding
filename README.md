# Jet coding assignment
This coding assignment is for Just Eat Takeaway.com

## Background and assignment criteria
The goal is to make calls to the provided API to filter for relevant restaurant data and display them on any interface. The four key data to focus on are:
- Name
- Cuisines
- Rating - as a number
- Address

Due to the sheer number of restaurant data returned from the API call, only the first 10 restaurants are be displayed.

The priority was put into how to display the restaurant data, as all interface types would be assessed the same.

## Assumptions
This application assumes the users to be regular customers, i.e. people looking to order food online. With that in mind, a web interface was chosen for easy accessibility and ease to use.

Prior research was conducted to determine what users generally look for in a food delivery app. Most relevant ones are:

- quickly find what the user is looking for
- generally don't care if they miss a few results, as long as they find what they want
- for delivery, interested in what can deliver the fastest
- for pickup, want to see the locations on map
- nice to search by cuisine

Therefore, the application was developed with these needs in mind.

## Requirements
The application requires Node.js version 20 or above to run. If you do not have Node.js installed, you can download it from [here](https://nodejs.org/en/download/). It also requires a working web browser, preferably the latest version of Firefox, Chrome, or Brave.

## To run
The application has been tested on the latest version of Firefox, Chrome, and Brave.

The application consists of a frontend and a backend. The frontend uses a web interface and the primary deliverable for the assignment. The backend is a proxy server for API calls. Therefore, two separate consoles are required to run the application.

Open a terminal and run the following:
```bash
cd ./backend
npm install
npm start
```
This command will change the working directory to the backend folder, install the required dependencies, and start the proxy server.

Then, open another terminal and run the following:
```bash
cd ./frontend
npm install
npm start
```
This command will change the working directory to the frontend folder, install the required dependencies, and start the web interface.

Brief explanation of the backend can be found [here](./backend/README.md).

Brief explanation of the frontend and a demo can be found [here](./frontend/README.md).

## Improvements
Due to limited time to complete the assignment, the application has some limitations. Some improvements that can be made are:

### Feature
- Cookies to store user preferences on the client side
- Determine user location to provide more relevant restaurant results
- More responsive changes to dimension resizing
- Expand to other postcode searches (currently only works for UK postcodes)
- More custom error pages/handling
- Mobile version as young users tend to use the mobile app more than the web app

### Code
- Run application in production environment (e.g. the cloud)
- Even though tests are provided, they can be expanded upon to cover more edge cases
- Resolve dependency issues
- Better styling

