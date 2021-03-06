# Night Life: Rails and React App

## Description
Night Life, an app made for night owls. With Night Life, night owls can check out events that happen after sunset. Promoters can come together to one place and promote the venue(s) and event(s). 

### User (all)
- Sign up to be a member to access Night Life
- Sign in to the app with their username and password
- View all events in the system 
- View all comments for an event
- Add a new comment to an event

### User (Role: Guest) 
- Edit/Delete comments that belongs them
- Profile display user infromation and activities 

### Promoter (Role: Admin)
- Create an Event
- Create a new Venue for a new event if Venue does not already exisit
- Edit/Delete any posted comments 
- Edit/Delete posted events
- Add new venue to the system
- Profile display admin user information and activites


This applicaiton was using Rails API, React frontend, React Bootstrap, Material UI, and Styled Components.


## Setup

To run the app locally, install the Rails and React dependencies and set up the
database:

```sh
bundle install
rails db:create db:migrate db:seed
npm install --prefix client
```

## Admin Account Information to test the App
- Username: jenidang
- Password: 1234567jd

## Reflection

Project goals included 
- buidling an app using a Rails API backend with a React frontend using Flatiron project demo file
- apply knowledge of Active Record Associations, Active Model Serilizer, Rails file structure, nested resource routing, custom rendering, cookies and sessions, and implement authorization/authentication including password protection.
- incorporate at least 3 different client-side routes using React Router with Navigation bar to allow using to navigate between routes 
- add styling using CSS, styled-components and incorporate some UI framework

A few chanlleges that I face while building Night Life: 
- Adding a drop-down selection showing a list of available venue and link connecting to the venue form to create a new venue if the venue is not on the list was not as simple as I thought it would be. After hours of troubleshooting and an extra pair of eyes, it was me, I double assigned the value.  


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate

## Resources 
- Project Deploying Demo App - https://github.com/learn-co-curriculum/phase-4-deploying-demo-app
- Pluralsight - https://www.pluralsight.com/guides/how-to-capture-the-value-of-dropdown-lists-with-react-bootstrap
- Material UI - https://mui.com/
- React Bootstrap - https://react-bootstrap.github.io/
