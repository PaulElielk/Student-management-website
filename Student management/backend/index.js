// using nodemon so that you do not need to type node index.js every time new code saved

// import express - is for building the Rest apis
import express from "express";

// import body-parser - helps to parse the request and create the req.body object
import bodyParser from "body-parser";

// import cors - provides Express middleware to enable CORS with various options, connect frontend
import cors from "cors";

// import routes
import router from "./routes/routes.js";

// import path
import path from "path";

// use path
const __dirname = path.resolve();

// init express
const app = express();

// Disable caching middleware - place this early
app.use((req, res, next) => {
  res.header('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.header('Pragma', 'no-cache');
  res.header('Expires', '0');
  res.header('Surrogate-Control', 'no-store');
  next();
});

// use express json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS with proper configuration
app.use(cors({
  origin: ['http://localhost:8080', 'http://127.0.0.1:8080'], // Allow your frontend origin
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// use router
app.use(router);

app.get('/api', function(req, res){
  res.json({ message: 'Welcome to restaurant api' });
});

// Static files with no caching
app.use(express.static(path.join(__dirname, './restaurant_management/'), {
  etag: false,
  lastModified: false,
  maxAge: 0,
  setHeaders: (res) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }
}));

// Catch-all route with no caching
app.get('/*', function (req, res) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.sendFile(path.join(__dirname, './restaurant_management/index.html'));
});

// PORT - update from 8001 to 8002
const PORT = process.env.PORT || 8002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// https://www.youtube.com/watch?v=GK2TiAAxmQ0
// https://www.bezkoder.com/node-js-rest-api-express-mysql/
// https://www.bezkoder.com/serve-vue-app-express/
// https://www.bezkoder.com/deploy-node-js-app-heroku-cleardb-mysql/
// https://www.youtube.com/watch?v=W-b9KGwVECs
// https://stackoverflow.com/questions/43362014/heroku-no-default-language-could-be-detected-for-this-app-error-thrown-for-no
// https://stackoverflow.com/questions/16128395/what-is-procfile-and-web-and-worker
// https://www.youtube.com/watch?v=lwOsI8LtVEQ