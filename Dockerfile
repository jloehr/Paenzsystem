FROM node:7.2.0

# Create app directory
RUN mkdir -p /usr/src/paenzsystem
WORKDIR /usr/src/paenzsystem

# Install app dependencies
COPY Source/package.json /usr/src/paenzsystem/
RUN npm install

# Bundle app source
COPY Source/ /usr/src/paenzsystem
RUN chmod -R +rx /usr/src/paenzsystem

EXPOSE 8080
EXPOSE 8443
CMD [ "npm", "start" ]
