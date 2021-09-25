### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
Callbacks, promises, and async/await.

- What is a Promise?
A promise is an object representing the eventual completion or failure of an asynchronous operation and it's resulting value.


- What are the differences between an async function and a regular function?
An async function waits until a promise is returned to finish running, a regular function runs code immediately.

- What is the difference between Node.js and Express.js?
Express is a web frame-work, Node is an environment that allows you to write back-end javascript code.

- What is the error-first callback pattern?
A function is which the first parameter is a potential error object and the second is the data returned by the function.


- What is middleware?
Middleware functions are functions that have access to the request object, response object, and the next function in an applications request/response cyle.


- What does the `next` function do?
The next function, when invoked, executes the middleware.  The middleware can execute any code and make changes to the request/response object.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)
You're making 3 separate requests in sequence which can slow down performance and structurally you requests aren't organized, and you could more easily assemble your response data into an array, producing cleaner looking/better organized code.

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}


async function getUsers() {
  
  let users = await Promise.all([$.getJSON('https://api.github.com/users/elie'),$.getJSON('https://api.github.com/users/joelburton'), $.getJSON('https://api.github.com/users/mmmaaatttttt')])
  

  return users;
}
