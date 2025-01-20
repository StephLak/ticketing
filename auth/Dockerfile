FROM node:alpine

WORKDIR /app
COPY  package.json .
# RUN npm install
RUN npm install --omit=dev
COPY . .

CMD ["npm", "start"]