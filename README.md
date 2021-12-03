# Server-Side Rendering App (React+Express.js+MongoDB)

A basic React+Express SSR app with a decent development environment (mainly for demonstration/tutorial or being used as project template). This project also contains:

- A docker-compose script and Dockerfile that handles the build process and launches a MongoDB container for testing.
- Basic test cases implemented with [jest](https://github.com/facebook/jest) and affiliated mock data & handlers.
- Adopted express-validator, eslint, nodemon.
- (WIP) Basic CI using GitHub Actions.

## Instruction

Run the commands to launch the dev server:

```bash
docker-compose up
```

and then you can try calling the APIs. You can also connect to the MongoDB from `localhost:27017`.

To run the unit test:

```bash
docker-compose run --rm app sh -c 'npm test'
```

If you want to access the frontend from `localhost:3000`, run the command:

```bash
npm run build-dev-client
```

## Sample APIs

This app has two sample APIs, one for `POST` and one for `GET`. Followings are the sample [httpie](https://github.com/httpie/httpie) CLI commands to call them:

- `POST`:
  ```bash
  http POST http://localhost:3000/api/todoItem/ \
    title=test \
    description="really serious" \
    expiredAt="2021-11-12" \
    status=wip \
    tags:='["tag3","tag4"]'
  ```
- `GET`:
  ```bash
  http GET http://localhost:3000/api/todoItem/ \
    tag=test4
  ```
