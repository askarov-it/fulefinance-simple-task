FROM node:16.3.0-alpine as build

# Copy source code
COPY . /app/
WORKDIR app

# Install dependencies
RUN npm i

CMD ["npm", "start"]
