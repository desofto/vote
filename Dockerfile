FROM node:alpine

RUN apk add --update --no-cache nodejs npm mysql-dev

ARG APP_ROOT="/app"

ENV NODE_ENV production

WORKDIR ${APP_ROOT}

COPY package.json package-lock.json ${APP_ROOT}/

RUN npm ci

COPY client/package.json client/package-lock.json ${APP_ROOT}/client/

RUN npm ci --prefix client

COPY index.js ${APP_ROOT}/
COPY config ${APP_ROOT}/config/
COPY lib ${APP_ROOT}/lib/
COPY models ${APP_ROOT}/models/
COPY routes ${APP_ROOT}/routes/
COPY serializers ${APP_ROOT}/serializers/
COPY views ${APP_ROOT}/views/
COPY migrations ${APP_ROOT}/migrations/
COPY seeders ${APP_ROOT}/seeders/
COPY test ${APP_ROOT}/test/
COPY .sequelizerc ${APP_ROOT}/

COPY client ${APP_ROOT}/client/

RUN npm run build --prefix client

EXPOSE 80

CMD ["npm", "run", "production"]
