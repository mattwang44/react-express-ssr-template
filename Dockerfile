FROM node:12.16.1-alpine as builder
ADD ./client client

RUN cd client \
    && yarn install \
    && yarn build  \
    && rm -rf node_modules


FROM mhart/alpine-node:12.16.1

WORKDIR /root

ADD package.json package.json
ADD package-lock.json package-lock.json
RUN npm install

ADD webpack.config.js webpack.config.js
ADD src src
RUN npm run build  

COPY --from=builder client/build dist/client

EXPOSE 3000

CMD ["node", "dist/entry.js"]
