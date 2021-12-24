FROM node:fermium-alpine as builder
ADD ./client client

RUN cd client \
    && npm install \
    && npm run build  \
    && rm -rf node_modules


FROM mhart/alpine-node:14.17

WORKDIR /root

ADD package.json package.json
ADD package-lock.json package-lock.json
RUN apk --no-cache --update --virtual .build-deps add \
    python make g++ py-pip build-base && \
    npm install && \
    apk del .build-deps

ADD src src

COPY --from=builder client/build src/client

EXPOSE 3000

CMD ["npm", "start"]
