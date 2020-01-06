# Simple Server-Side rendering App (Express+React)

## Instruction

1. Add client-side project with create-react-app.

   ```
   npx create-react-app client
   ```

2. Run local MongoDB server

   ```
   mongod --port 27017 --dbpath=/Users/<username>/data/db --config /usr/local/etc/mongod.conf --fork
   ```

3. Build docker image

   ```
   docker build . -t ssr
   ```

4. Run the docker image

   ```
   docker run -p 127.0.0.1:3000:3000 ssr
   ```
