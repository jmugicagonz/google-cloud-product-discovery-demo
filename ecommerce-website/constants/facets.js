//Implement and customise facets 
//refs: 
// 1.- https://cloud.google.com/retail/docs/reference/rest/v2/projects.locations.catalogs.placements/search
// 2.- https://cloud.google.com/retail/docs/reference/rest/v2/FacetSpec

export const facetSpecs = [
    {
        "facetKey": {
        "key": "colors"
        }
    },
    {
        "facetKey": {
        "key": "genders"
        }
    },
    {
        "facetKey": {
        "key": "ageGroups"
        }
    },
    {
        "facetKey": {
        "key": "sizes"
        }
    },
    {
        "facetKey": {
        "key": "materials"
        }
    },
    {
        "facetKey": {
        "key": "patterns"
        }
    },
]