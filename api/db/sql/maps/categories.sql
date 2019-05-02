SELECT
  id,
  category,
  COUNT(categories_id)
FROM
  categories
  LEFT JOIN analyses_to_categories
  ON id = categories_id
GROUP BY
  id