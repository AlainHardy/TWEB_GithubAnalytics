FROM node:6.11.4
MAINTAINER Alain Hardy <alain.hardy@heig-vd.ch>

COPY src /opt/app/

WORKDIR /opt/app/
RUN npm install

ENTRYPOINT ["node", "/opt/app/app.js"]