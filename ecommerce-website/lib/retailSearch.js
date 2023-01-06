// Function to get all the results for a certain query
export const searchQuery = async (query) => {
    try {
        const res = await fetch('/api/search',{
            method: "POST",
            body: query
        });
        const searchResult = JSON.parse((await res.json()));
    //  Get array with results' names. Depending on if the product has variants or not, return the name of the product or the name of the first variant
    console.log(["search result",searchResult.results])
    /*let resultsNames = searchResult.results.map((result) => {
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
    let products = await Promise.all(promises)*/
    let products = searchResult.results.map((result) => {
        if(result.product.variants.length>0) {
            return(result.product.variants[0])
        }
        else {
            return(result.product)
        }});
    products = products.filter(item => item != undefined)
    return products;
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
        //const element = fillInfo(searchResult.id,searchResult.images[0].uri,searchResult.description,searchResult.uri,searchResult.title)
        return searchResult;
    } catch (err) {
        console.log(err);
    }
  }

export const fillInfo = (id, image, description, uri, title) => {
return (
    {
        id: id,
        image: image,
        description: description,
        uri: uri,
        title: title
    }
)
}