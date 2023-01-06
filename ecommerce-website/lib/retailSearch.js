// Function to get all the results for a certain query
export const searchQuery = async (query) => {
    try {
        const res = await fetch('/api/search',{
            method: "POST",
            body: JSON.stringify({
                "query": query,
                "filter": {
                    //"colors": [`\"Noir\"`,`\"Bleu\"`,`\"Beige\"`]
                }
            })
            }
        );
        const searchResult = JSON.parse((await res.json()));
    let facets = searchResult.facets
    //  Get array with results' names. Depending on if the product has variants or not, return the name of the product or the name of the first variant
    let resultsNames = searchResult.results.map((result) => {
        if(result.product.variants.length>0) {
                return(result.product.variants[0].name);
            }
            else {
                return(result.product.name)
            }});
    //  Get details needed for each of the returned products
    let promises = []
    for (const name of resultsNames) {
        const element = getProductDetails(name)
        promises.push(element)
    }
    let products = await Promise.all(promises)
    products = products.filter(item => item != undefined)
    console.log(["facets",facets])
    console.log(["products",products])
    const response = {
        "facets": facets,
        "results": products
    }
    return response;
    } catch (err) {
        console.log(err);
    }
};

export const getProductDetails = async (name) => {
    try {
        const res = await fetch('/api/product-details',{
            method: "POST",
            body: name
        });
	    const searchResult = JSON.parse(await res.json());
        return searchResult;
    } catch (err) {
        console.log(err);
    }
  }