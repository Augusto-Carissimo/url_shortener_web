# Part II: Building the Client Application
Upon approval from LTV, please move forward with the second part of the code challenge.

Setting Up the Front-End (React used as an example). Please note that you may create a separate Github repository for this application in your personal Github account and share the repository with us via email once it is complete.

1. **Create the Front-End Application**:
   - For React: `npx create-react-app my-app`

2. **Local Development Configuration**:
   - Set the `proxy` in the front-end project’s package configuration to route API requests to the Docker-hosted Rails server.
   - For React in `package.json`:
     ```json
     "proxy": "http://localhost:3000",
     ```

## Core Requirements for Part II:
* There must be a view for the Top 100 most frequently accessed URLs.
* There must be a form for inputting URLs into the system.
* Inputting a valid URL should result in displaying the new shortened URL to the user.
* Inputting an invalid URL should result in displaying errors to the user.


# General Advice for Connecting Both Apps

1. **Cross-Origin Resource Sharing (CORS)**:
   - Configure CORS in the Rails application to allow requests from the front-end domain, even locally. This is crucial for local development environments where ports differ.
   - Example CORS setup in Rails:
     ```ruby
     # Gemfile
     gem 'rack-cors'

     # config/initializers/cors.rb
     Rails.application.config.middleware.insert_before 0, Rack::Cors do
       allow do
         origins 'localhost:3001' # Adjust the port for the React app
         resource '*',
                  headers: :any,
                  methods: [:get, :post, :put, :delete, :options]
       end
     end
     ```

3. **Testing Connectivity**:
   - Test the connection by making a simple API call from the front-end app to the Rails API to fetch or send data.

4. **Documentation and Resources**:

    ##### Docker

    1. **Docker Documentation**:
       - [Docker Overview](https://docs.docker.com/get-started/overview/)
       - [Docker Compose](https://docs.docker.com/compose/)

    ##### Rails

    2. **Rails API**:
       - [Getting Started with Rails](https://guides.rubyonrails.org/getting_started.html)
       - [Building a Rails API](https://guides.rubyonrails.org/api_app.html)

    3. **CORS in Rails**:
       - [rack-cors gem on GitHub](https://github.com/cyu/rack-cors)

    ##### React

    4. **React Documentation**:
       - [Create React App](https://create-react-app.dev/)
       - [React Proxy Configuration](https://create-react-app.dev/docs/proxying-api-requests-in-development/)

   ##### General Development and Troubleshooting

    5. **CORS (Cross-Origin Resource Sharing)**:
       - [Mozilla CORS Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

    6. **Networking in Docker**:
       - [Docker Network Overview](https://docs.docker.com/network/)

# Debugging Tips

##### Check Docker Container Status
Use `docker ps` to ensure that all required containers are up and running. If a container is not running, use `docker logs [container_name]` to inspect any error messages that may have caused the container to crash or fail to start.

##### Verify Port Exposure and Mapping

Ensure that the ports your Rails API needs are correctly exposed and mapped in your Docker setup. This is defined in your docker-compose.yml file under the ports section. Use `docker port [container_name]` to see the actual port mappings.

##### Network Connectivity

Test network connectivity between your Docker containers and your local machine. You can use `docker exec -it [container_name] ping [target_IP_or_hostname]` to check if your container can reach your front-end application or external services.

##### Check Environment Variables

Incorrect environment variables can often cause applications to behave unexpectedly. Double-check that all required environment variables are properly set. You can use `docker exec -it [container_name] env` to list environment variables within a container.

##### Review CORS Configuration

Cross-Origin Resource Sharing (CORS) issues can prevent your front-end application from communicating with your Rails API. Ensure CORS is configured correctly in your Rails application to allow requests from the appropriate front-end URL.

##### Browser Console and Network Tools

Utilize browser developer tools to inspect console logs and network requests. This can provide insights into errors occurring on the front-end, such as failed network requests, CORS issues, or JavaScript errors.

##### Rails Logs

Check Rails logs for any error messages or stack traces. This can be done by looking at the output in your terminal where you run the Docker container or by accessing the log files directly within the container using docker exec -it [container_name] tail -f log/development.log.

##### Front-End Framework Debugging

For React, use the React Developer Tools extension to inspect components and their states.

##### Rebuild Docker Containers

If you make changes to the Docker setup (like Dockerfile or docker-compose files), ensure you rebuild your containers with docker-compose build and restart them. Sometimes, persistent issues are resolved by simply rebuilding the environment.

##### Simplify and Isolate

When faced with a complex error, simplify the scenario or isolate components to narrow down the source of the problem. For instance, test API endpoints independently with tools like Postman or curl to ensure they work as expected before connecting them with the front-end.
