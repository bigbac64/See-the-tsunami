# Stage 1 : Release
FROM node:16-alpine

ARG DOMAIN_API
ARG PORT

# Get source of website
WORKDIR /usr/front-the-tsunami

COPY ./ /usr/front-the-tsunami

# Install dependencies of react
RUN npm ci
# Build the app
RUN REACT_APP_DNS=${DOMAIN_API} \
    npm run build

# Set the env
ENV NODE_ENV=production
ENV PORT=${PORT}

EXPOSE ${PORT}
CMD [ "npx", "serve", "build" ]

#CMD tail -f /dev/null