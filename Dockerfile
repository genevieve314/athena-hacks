FROM node:6

LABEL maintainer="genevieve@joinhoney.com" \
      description="Honey data API v2 for Droplist"

WORKDIR /opt/app
COPY package*.json ./
COPY index.js ./
COPY src ./src/

RUN npm install --quiet

EXPOSE 8080

ENTRYPOINT ["npm"]