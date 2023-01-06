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
//Import facet specifications for faceted search. If empty, no facets are returned.
import { facetSpecs } from "../../constants/facets";

const callSearch = async ( body ) => {
  //Transform body into JSON
  const bodyJSON = JSON.parse(body);
  console.log(["bodyJSON",bodyJSON]);
  //Get projectId from the retail service client
  const projectId = await searchServiceClient.getProjectId();

  // Placement is used to identify the Serving Config name.
  //const placement = `projects/${projectId}/locations/global/catalogs/default_catalog/placements/default_search`; TODO: delete if the one below works
  const placement = `projects/${projectId}/locations/global/catalogs/default_catalog/servingConfigs/default_serving_config`;

  // Raw search query.
  const query = bodyJSON.query;

  // A unique identifier for tracking visitors.
  const visitorId = '11111'; //TODO: assign a real visitorId

  // Maximum number of Products to return.
  const pageSize = 12;

  /**
   *  The filter syntax consists of an expression language for constructing a
   *  predicate from one or more fields of the products being filtered. Filter
   *  expression is case-sensitive. See more details at this user
   *  guide (https://cloud.google.com/retail/docs/filter-and-order#filter).
   *  If this field is unrecognizable, an INVALID_ARGUMENT is returned.
   */
  const tofilter = bodyJSON.filter;
  const filter = `${tofilter.colors?`colors: ANY(`+tofilter.colors+`)`:``}`;
  console.log(["filter",filter])

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
      facetSpecs: facetSpecs,
      filter: filter
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