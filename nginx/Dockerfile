FROM nginx:1.15.6-alpine

# Remove the default nginx configuration
RUN rm -rf /etc/nginx/conf.d/default.conf

# Copy our custom nginx configuration file
COPY etc/nginx/conf.d/nodeapp.conf /etc/nginx/conf.d/nodeapp.conf