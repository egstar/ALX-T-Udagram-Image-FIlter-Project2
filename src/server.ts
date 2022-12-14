import express, {Request,Response }from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
import * as dotenv from 'dotenv';
dotenv.config();
(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  app.get("/filteredimage", async (req: Request,res: Response): Promise<unknown> => {
    const img = req.query.image_url as string;
    if (!img) {
      return res
        .status(400)
        .send('Please specify the URL of the image you need to filter.');
    }
    try {
      const resp = await filterImageFromURL(img)
      if(!resp){
        return res
        .status(400)
        .send('Please specify the URL of the image you need to filter.');
      }
      res.status(200).sendFile(resp)
      res.on('finish', () => {
        deleteLocalFiles([resp])
      })
    } catch(e) {
      return res.status(500).send(e)
    }


  })
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();