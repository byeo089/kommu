## General Info
* This repo contains my contribution to the MVP build for Kommu
* Kommu is a private social network that allows you to (1) discover and coordinate travel with friends and connections, and (2) propose home exchanges within your personal trusted networks to travel more affordably.

## Technologies
Project is created with:
* Front end: React.js v18.2.0
* Back end: .NET/C# v6.0.5
* Database: Microsoft SQL Server

Live Demo: https://kommu.azurewebsites.net/

## Setup 
To run this project, install it locally using yarn:

```
$ yarn install
$ yarn start
```

### Already Installed
- [bootstrap](https://getbootstrap.com/): This module provide the HTML/CSS and JS Framework that drive the foundational aspects of the UI.
- reactstrap: This is a React wrapper for Boostrap. It is optional to use this and we recommend you use bootstrap directly when possible.
- axios: This library is used to make Ajax requests to a server.
- react-router: The module used to make client side routing possible
- [toastr](https://github.com/CodeSeven/toastr): This is to be used to provide informational messages to the user. 
- [sweetalert](https://sweetalert.js.org/guides/#using-with-libraries): Alerts are very obtrusive so they should not be used every time you want to provide feedback to a user. Instead use them when you want to confirm the user wants to perform an action or when you want to give a user a choice of actions.
- [rc-pagination](https://github.com/react-component/pagination) To import the css file add to the top of the component:
```javascript
import "rc-pagination/assets/index.css";
import locale from "rc-pagination/lib/locale/en_US";
```
---

## Feature Contributions:

### Event Listing
* Centralized page for users to see available event postings and engage with with the Kommu community, rendering all events on responsive cards in paginated form from records in the database.
* A number of filtering options was implemented for quick navigation such as: 
  - dropdown selection menu to filter by the event type 
  - dynamic button to render a table of all free events 
  - search bar to filter events against the query in  realtime.
* React Libraries: RC-Pagination, Bootstrap,

### Event Details Page
* Page reveals more information details about the individual event by using advanced database queries and a map visual of its location.
* React Libraries: Google Maps, Bootstrap

![Events Page](https://user-images.githubusercontent.com/99160670/186582436-39c5d6ee-f35c-45c6-8809-ae192a5b14e7.png)

![Search Pagination](https://user-images.githubusercontent.com/99160670/186582460-ba6b5294-1271-46c9-8757-1896421207d7.png)

![Toggle FreeEvents](https://user-images.githubusercontent.com/99160670/186582577-62d39e24-e507-4c9f-b8c8-11c441b1c643.png)

![Events Detail Page](https://user-images.githubusercontent.com/99160670/186582478-30a0b9a0-43b5-4311-879a-60b338142ddd.png)







