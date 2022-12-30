const {SearchServiceClient} = require('@google-cloud/retail').v2;
const {ProductServiceClient} = require('@google-cloud/retail').v2;

// Instantiates a retail client.
export const searchServiceClient = new SearchServiceClient();

// Instantiates a product client.
export const productServiceClient = new ProductServiceClient();