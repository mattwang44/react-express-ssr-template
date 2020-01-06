FROM node:8.15-alpine as builder
ADD ./client client

RUN cd client \
    && yarn install \
    && yarn build  \
    && rm -rf node_modules


FROM mhart/alpine-node:8.9.2

WORKDIR /src

ADD package.json package.json
ADD package-lock.json package-lock.json
ADD webpack.config.js webpack.config.js
ADD src src

EXPOSE 3000

RUN npm install  \
    && npm run build  

COPY --from=builder client/build dist/client

CMD ["node", "dist/entry.js"]
