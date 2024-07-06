# part 1 - build image off reactapp
FROM node as build-stage
MAINTAINER bvt2202
RUN mkdir /reactapp
COPY ./job_parser_frontend /reactapp
WORKDIR /reactapp
RUN yarn
ENV PATH /reactapp/node_modules/.bin:$PATH
RUN npm run build

# part 2 - copy build above in nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

COPY --from=build-stage /reactapp/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]


# FROM node
# RUN mkdir /reactapp
# COPY . /reactapp
# WORKDIR /reactapp
# ENV PATH /app/node_modules/.bin:$PATH
# RUN yarn
# CMD ["npm", "start"]

# docker build -t reactapp .
# docker images | grep reactapp
# winpty docker run -it -p 3000:3000 reactapp
