# Stage 1 : Release
FROM node:16-alpine

# Get source of website
WORKDIR /usr/front-the-tsunami

COPY ./ /usr/front-the-tsunami

# Install dependencies of react
RUN npm ci
# Build the app
RUN npm run build

# Set the env
ENV NODE_ENV=production
ENV PORT=3001

EXPOSE 3001
CMD [ "npx", "serve", "build" ]

#CMD tail -f /dev/null