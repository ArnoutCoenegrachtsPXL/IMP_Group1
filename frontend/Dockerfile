FROM node:lts-alpine

WORKDIR /frontend

COPY  ./package.json .

# install project dependencies
RUN npm install
RUN npm install primevue @primevue/themes

EXPOSE 5173
CMD [ "npm", "run", "dev"]