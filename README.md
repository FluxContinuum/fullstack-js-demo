# fullstack-js-demo
The goal of this publication is to convey an ability to architect a full stack, end-to-end solution implementing many standard patterns for React and Node.js.

The app exposes a RESTful Express API over SSL using JSON web tokens for authentication and authorization, with a basic responsive interface from Google's material design specification. The source code includes implementations pulled from various private projects, ranging from naive to complete with best practices, aiming to illustrate an iterative and incremental development methodology. The source structure seeks to demonstrate an appreciation for abstraction and separation of concerns, implementing some common patterns that help to avoid conflicts when collaborating with a team.

## Running the app
Minimal environment variables in `.env` and a self-signed SSL certificate come bundled with the source for convenience. Some functionality will not work without providing your own values, such as third-party OAuth providers.

If you have docker with docker-compose, simply execute `docker-compose up` from the api directory. This will create a PostgreSQL container and a Node runtime for the app. After initialization, you may view the app in your browser at `localhost` on TCP ports 80 and 443.

Alternatively, you may execute `npm install` and `npm start` from both the api and client directories in separate terminals. The client will open automatically in your browser on port 3001. This method will require that you have a local installation of PostgreSQL 11.2 and Node.js 11.10.0
