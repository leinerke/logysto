# Use a stock Docksal image as the base
FROM docksal/cli:stable-php7.4

# nvm/node/npm are only available in the docker user context
USER docker

# Install additional global npm dependencies
RUN set -e; \
    # Initialize the user environment (this loads nvm)
	  . $HOME/.profile; \
	  # Install the necessary nodejs version
	  nvm install 16.14.0; \
	  nvm alias default 16.14.0; \
	  # Install packages
	  npm install -g nodemon; \
    npm install -g pm2;

# Always switch back to root in the end
USER root