FROM node:18-alpine AS builder

WORKDIR /build

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

FROM node:18-alpine AS prod

WORKDIR /api
COPY --from=builder /build/dist ./dist
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

CMD [ "node", "dist/index.js" ]