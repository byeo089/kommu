# Kommu
This repo contains my contribution to the MVP build for Kommu

Front End - React.js,
Back End - .NET Core (C#),
Database - MS SQL

***What is Kommu***
Kommu is a private social network that allows you to (1) discover and coordinate travel with friends and connections, and (2) propose home exchanges within your personal trusted networks to travel more affordably.

***Feature Contributions:***
1. Event Listing
- Centralized page for users to see available event postings and engage with with the Kommu community, rendering all events on responsive cards in paginated form from records in the database.
- A number of filtering options was implemented for quick navigation such as: 
  - dropdown selection menu to filter by the event type 
  - dynamic button to render a table of all free events 
  - search bar to filter events against the query in  realtime.
- React Libraries: RC-Pagination, Bootstrap,

2. Event Details Page
- Page reveals more information details about the individual event by using advanced database queries and a map visual of its location.
- React Libraries: Google Maps, Bootstrap

