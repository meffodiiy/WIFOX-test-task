FROM node:20.11.0-alpine
WORKDIR /app
COPY . .
RUN npm ci && npm run build
CMD npm run start
