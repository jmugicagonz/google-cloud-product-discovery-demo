############################  SCHEMA MAPPING EXAMPLE ############################
##### PRELIMINARY INFO #####
# Substitute `pod-fr-retail.demobestbuy.products_distinct` for `project_id.dataset.source_table`
# Substitute `pod-fr-retail.demobestbuy.products_rs` for `project_id.dataset.destination_table`

##### QUERY EXAMPLE #####
CREATE OR REPLACE TABLE `pod-fr-retail.demobestbuy.products_rs`
(
  id STRING NOT NULL
  ,type STRING
  ,primaryProductId STRING
  ,collectionMemberIds ARRAY<STRING>
  ,gtin STRING,
  ,categories ARRAY<STRING>
  ,title STRING NOT NULL
  ,brands ARRAY<STRING>
  ,description STRING
  ,languageCode STRING
  ,attributes ARRAY<STRUCT<key STRING,value STRUCT<text ARRAY<STRING>,numbers ARRAY<FLOAT64>>>>
  ,tags ARRAY<STRING>
  ,priceInfo STRUCT<currencyCode STRING,price FLOAT64,originalPrice FLOAT64,cost FLOAT64,priceEffectiveTime STRING,priceExpireTime STRING>
  ,rating STRUCT<ratingCount INT64,averageRating FLOAT64,ratingHistogram ARRAY<INT64>>
  ,expireTime STRING
  ,ttl STRUCT<name INT64,nanos INT64>
  ,availableTime STRING
  ,availability STRING
  ,availableQuantity INT64
  ,fulfillmentInfo ARRAY<STRUCT<type STRING, placeIds STRING>>
  ,uri STRING
  ,images ARRAY<STRUCT<uri STRING, height STRING, width STRING>>
  ,audience STRUCT<genders ARRAY<STRING>, ageGroups ARRAY<STRING>>
  ,colorInfo STRUCT<colorFamilies ARRAY<STRING>, colors ARRAY<STRING>>
  ,sizes ARRAY<STRING>
  ,materials ARRAY<STRING>
  ,patterns ARRAY<STRING>
  ,conditions ARRAY<STRING>
  ,retrievableFields STRING
  ,publishTime STRING
  ,promotions ARRAY<STRUCT<promotionId STRING>>
)
AS SELECT
  model #id
  ,NULL #type
  ,model #primaryProductId
  ,[] #collectionMemberIds
  ,NULL #gtin
  ,[category] #categories
  ,name #title
  ,IF(manufacturer IS NULL, [], [manufacturer]) #brands
  ,description #description
  ,NULL #languageCode
  ,[STRUCT('shipping' AS key,STRUCT(ARRAY<STRING>[] AS text, IF(shipping IS NULL, ARRAY<FLOAT64>[999.9],ARRAY<FLOAT64>[shipping])  as numbers) AS value)
  ,STRUCT('type' AS key,STRUCT(IF(type IS NULL, ARRAY<STRING>["toDefine"], ARRAY<STRING>[type]) AS text, ARRAY<FLOAT64>[]  as numbers) AS value)] AS attributes #attributes
  ,[] #tags
  ,STRUCT("USD" as currencyCode,price AS price,CAST(NULL AS FLOAT64) AS originalPrice,CAST(NULL AS FLOAT64) AS cost,CAST(NULL AS STRING) AS priceEffectiveTime,CAST(NULL AS STRING) AS expireTime) #priceInfo
  ,NULL #rating
  ,NULL #expireTime
  ,NULL #ttl
  ,NULL #availableTime
  ,NULL #availability
  ,NULL #availableQuantity
  ,[] #fulfillmentInfo
  ,url #uri
  ,[STRUCT(image AS uri, CAST(NULL AS STRING) AS height, CAST(NULL AS STRING) AS width)] #images
  ,STRUCT(ARRAY<STRING>[] AS genders,ARRAY<STRING>[] AS ageGroups) #audience
  ,STRUCT(["Mixed"] AS colorFamilies,ARRAY<STRING>[] AS colors) #colorInfo
  ,[] #sizes
  ,[] #materials
  ,[] #patterns
  ,[] #conditions
  ,NULL #retrievableFields
  ,NULL #publishTime
  ,NULL #promotions
FROM `pod-fr-retail.demobestbuy.products_distinct`;
