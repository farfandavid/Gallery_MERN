import express from "express";
import fileUpload from "express-fileupload";
import postRoutes from './routes/posts.routes.js'

const app = express();
// middlewares
app.use(express.json());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: './upload'
}))
// routes
app.use(postRoutes);


export default app;