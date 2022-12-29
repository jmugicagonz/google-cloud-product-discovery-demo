##### PRELIMINARY INFO #####
# Substitute `pod-fr-retail.demobestbuy.products` for `project_id.dataset.table`
# Substitute `pod-fr-retail.demobestbuy.products_distinct` for `project_id.dataset.destination_table`

#### STEPS ####
#Get the number of distinct ids and number of rows
SELECT COUNT(*), COUNT(DISTINCT(model)) FROM `pod-fr-retail.demobestbuy.products`;

#Get elements with no id, or no title (which are the required fields)
SELECT * FROM `pod-fr-retail.demobestbuy.products` WHERE model IS NULL OR model="" OR name IS NULL OR name="";

#Get those elements with repeated ids to see why this can be happening
SELECT model FROM `pod-fr-retail.demobestbuy.products` GROUP BY model HAVING COUNT(model)>1;

#Create new table with distinct elements and getting rid of those elements with no title or id, which are required
#For those elements with repeated id, keep just one of them, randomnly (this is not a recommended practice but enough for this demo)
#Ref: https://stackoverflow.com/questions/36675521/delete-duplicate-rows-from-a-bigquery-table
CREATE OR REPLACE TABLE `pod-fr-retail.demobestbuy.products_distinct` AS (
select * EXCEPT(row) from (
select * from (
select *, ROW_NUMBER() OVER(PARTITION BY model) AS row
from `pod-fr-retail.demobestbuy.products`)
where row = 1)
WHERE model IS NOT NULL AND model!="" AND name IS NOT NULL AND name!="");
