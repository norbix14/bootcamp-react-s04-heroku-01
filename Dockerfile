FROM node:12.22.7-alpine3.12
# node version

# create app directory (virtually)
WORKDIR /app

# install app dependencies
COPY . .

RUN npm install

# bundle app source
# COPY . .

# expose app port
# EXPOSE 8080 | 3000 | ....

# run app. will be "node app.js"
CMD ["node", "/app/app.js"]
