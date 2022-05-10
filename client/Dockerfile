#run
FROM nginx:stable-alpine
COPY client/public /usr/share/nginx/html
# COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]