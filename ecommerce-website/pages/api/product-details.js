import { productServiceClient } from "../../constants/constants"

const getProduct = async (name) => { 
    //const projectId = await productClient.getProjectId();
    // Construct request
    const request = {
        name
    };
    //console.log('Get product request:', request);

    // Run request
    const searchResponse = await productServiceClient.getProduct(request);

    // Get product
    const foundProduct = searchResponse[0];

    return JSON.stringify(foundProduct);
}

export default async function handler(req, res) {
  return new Promise((resolve, reject) => {
    getProduct(req.body)
      .then(response => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'max-age=180000');
        res.end(JSON.stringify(response));
        resolve()
      })
      .catch(error => {
        res.json(error);
        res.status(405).end();
        return(resolve()); // in case something goes wrong in the catch block (as vijay commented)
      });
  });
};



/*export default function handler(req, res) {
    getProduct(req.body).then((results) => {
        res.status(200).json({ data : results})})
  }*/