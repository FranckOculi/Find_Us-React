import configuration from './config/configuration.js';
import fastify from 'fastify';
import cookie from 'fastify-cookie';
import cors from 'fastify-cors';
import authRoutes from './src/routes/authRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import positionRoutes from './src/routes/positionRoutes.js';
import groupRoutes from './src/routes/groupRoutes.js';
import friendRoutes from './src/routes/friendRoutes.js';

const app = fastify({
  logger: true,
});

// // cors
app.register(cors, {
  credentials: true,
  origin: true, //>>> all
  //   // origin: 'http://localhost:5501',
  //   // allowedHeaders: [
  //   //   'Origin',
  //   //   'X-Requested-With',
  //   //   'Accept',
  //   //   'Content-Type',
  //   //   'Authorization',
  //   // ],
  //   // methods: ['GET', 'PUT', 'POST', 'DELETE'],
});

// jwt
app.register(cookie, {
  secret: configuration.tokenSecret,
  parseOptions: {},
});

// Routes managers
app.register(authRoutes, { prefix: '/auth' });
app.register(userRoutes, { prefix: '/user' });
app.register(positionRoutes, { prefix: '/position' });
app.register(groupRoutes, { prefix: '/group' });
app.register(friendRoutes, { prefix: '/friend' });

// Run the server !
const start = async () => {
  try {
    await app.listen(configuration.port);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
