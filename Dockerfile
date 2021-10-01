FROM node:14.16.0-alpine
LABEL version="1.0"
LABEL maintainer = ["agni1984@gmail.com"]
RUN apk add g++ make python
RUN mkdir /app

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install


# add app
COPY . ./
EXPOSE 3000

# start app
CMD ["npm", "run", "start"]