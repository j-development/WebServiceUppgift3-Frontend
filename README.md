# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Java webservices – last assignment

In this last assignment for this couse I have been working mostly in the frontend, that’s because in the last course I did most of the backend, so we decided to switch this time around. I started with opening a new diagram on app.diagrams.net and sketching up workflow, dependencies and project architecture. This was just to get an idea of what to do first and not a final blueprint. I think it helps a lot to do this, you can keep track of what the plan is, and you can always change the plan as you go.

For this app I wanted to go with React as the frontend library, with Material UI or MUI design library. For state management I wanted to investigate Recoil which was recommended to us in a previous course. I had not before used it so this would be interesting, in earlier projects I have opted for other solutions like useReducer with useContext. For routing I thought I just use the standard react-router library

### Architecture

I separated modules in four directories: api, components, constants, pages. Pages represented different pages in the React app. I merged similar functionalities like register and login into the same page, which could share the same UI components. This is to make development faster and reduce boilerplate.

### Webservice-requests

For communication with our java webservice backend I stuck with the standard fetch() API. I have tried axios also but think this works just as well. I separated the logic into two modules, PostApi.js and UserApi.js, according to the different resources in the backend.
Design

For UI design I used components from MUI, I have used this library before and it takes very little time to implement and looks really well. All without having to think too much about CSS which can be really nitty-gritty.

### Discussion

I had two big issues during this project which took a lot of time to sort out or figure out something else. The first one was with useLocation hook. My intention was to use that hook to set the “state” property of the location object to the path of where the user was coming from. Then use the useNavigate hook to navigate to that path/endpoint. One example of the flow would be `Click Edit on Post -> Need to login -> Navigate to Edit post`.
When going from step 2 to 3 the app needs to know where it came from, in step 1. Because in another example the flow would be
`Click Create New Post -> Need to login -> Navigate to Create Post`, or
`Click to Login -> Need to login -> Navigate to homescreen(“/”)`.

I researched a lot but could not make it work as expected, even though I am positive I used the hook correctly. Anyways I needed to get it done and needed to send a path to useNavigate(), so I made a temporary fix which just checks if there is anything in the selectPost state, then it would send you to edit-page after login. But I think now I will just send all paths to edit-page after login and check the selectPost there instead and render different components if there is a selected post or not.

If I would continue working on this app, I would research another similar solution that would solve this problem. I could probably just use a stack in a global state, but I don’t think that would have solved the problem more elegantly than using an established module.

My second big problem was actually in the backend with cors policy. At the start of the project I got one cors policy-error In the chrome developer console. That was resolved when I added a bean which allowed origin of the React app (localhost:3000). But then another cors-policy error showed up in console when I was implementing updatePost with PUT requests.

I researched and modified everything with that bean, allowed methods and exposed headers. Since it was that bean that resolved it the first time I thought it was responsible for cors policy. Turned out anyways that I needed to modify the filterchain bean aswell that Philip had implemented. Which I think is odd because I needed to
first cors().disable() then allow origin in the corsmapping.

Anyways overall I have enjoyed doing this assignment and think it went very well and was challenging at the same time. Learned a lot of new stuff about react and spring boot and feel more confident in developing these kind of projects now and Im looking forward to the next course project

/Johan
