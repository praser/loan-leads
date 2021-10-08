FROM node:14.17

WORKDIR /usr/src

COPY ./package.json .

COPY ./packages/api ./packages/api
COPY ./packages/core ./packages/core
COPY ./packages/utils ./packages/utils

RUN yarn workspace @loan-leads/core install --non-interactive
RUN yarn workspace @loan-leads/utils install --non-interactive
RUN yarn workspace @loan-leads/api install --non-interactive

WORKDIR /usr/src/packages/api
EXPOSE 3000
CMD ["yarn", "dev"]