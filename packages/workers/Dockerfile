FROM node:14.17

WORKDIR /usr/src

COPY ./package.json .

COPY ./packages/core ./packages/core
COPY ./packages/utils ./packages/utils
COPY ./packages/database ./packages/database
COPY ./packages/workers ./packages/workers

RUN yarn workspace @loan-leads/core install --non-interactive
RUN yarn workspace @loan-leads/utils install --non-interactive
RUN yarn workspace @loan-leads/database install --non-interactive
RUN yarn workspace @loan-leads/workers install --non-interactive

WORKDIR /usr/src/packages/workers
CMD ["yarn", "worker:start:leads"]