// Copyright 2022 Google Inc. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

//Import the retail service client to perform requests
import { searchServiceClient } from "../../constants/constants";

const callSearch = async ( toquery ) => {  

  //Get projectId from the retail service client
  const projectId = await searchServiceClient.getProjectId();

  // Placement is used to identify the Serving Config name.
  //const placement = `projects/${projectId}/locations/global/catalogs/default_catalog/placements/default_search`; TODO: delete if the one below works
  const placement = `projects/${projectId}/locations/global/catalogs/default_catalog/servingConfigs/default_serving_config`;

  // Raw search query.
  const query = toquery;

  // A unique identifier for tracking visitors.
  const visitorId = '11111'; //TODO: assign a real visitorId

  // Maximum number of Products to return.
  const pageSize = 12;

  const IResponseParams = {
  ISearchResult: 0,
  ISearchRequest: 1,
  ISearchResponse: 2,
  };

  // Construct request
  const request = {
      placement: placement,
      query: query,
      visitorId: visitorId,
      pageSize: pageSize,
  };

  // Run request
  const response = await searchServiceClient.search(request, {
      autoPaginate: false,
  });

  const searchResponse = response[IResponseParams.ISearchResponse];

  if (searchResponse.totalSize === 0) {
      console.log('The search operation returned no matching results.');
  } else {
      return JSON.stringify(searchResponse);
  }
};

export default async function handler(req, res) {
  return new Promise((resolve, reject) => {
    callSearch(req.body)
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
  //Call search function with the query provided in the body
  callSearch(req.body).then((results) => {
    //console.log(["Results from search are: ",results])
    return(
      res.status(200).json({ data : results})
      
      )
  });
  process.on('unhandledRejection', err => {
    console.error(err.message);
    process.exitCode = 1;
  });
}*/