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

ADD src src

COPY --from=builder client/build src/client

EXPOSE 3000

CMD ["npm", "start"]
