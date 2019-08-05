This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the application on port 3000

### `npm run build`

Bundles the application

### `npm test`

Some testing examples using react-testing-library with Jest

### Some observations

Basically you can order pizzas on the Order Pizza menu. To order a pizza you have to login. I've created a "fake user" with the email: john.waldo@waldo.com and 123456 as the password ( anything other than that will show an error message ).
I've used [Semantic React UI](https://semantic-ui.com/) for the components. I've mixed some "coding patterns" trying to emulate some of yours. Erik told me that you are trying to migrate to Typescript. I'm using Flow that I think that is a good "middle term".
For the Graphql calls I'm using [graphql-hooks](https://github.com/nearform/graphql-hooks) that is a small and usefull module for hooks. Didn't see the need for Redux and I know that the new Context API doesn't solve all of the scenarios but it was more useful for a small project.
