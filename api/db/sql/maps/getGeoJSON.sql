SELECT jsonb_build_object(
  'type',     'FeatureCollection',
  'crs',      jsonb_build_object(
    'type',       'name',
    'properties', jsonb_build_object(
      'name',     'urn:ogc:def:crs:OGC:1.3:CRS84'
    )
  ),
  'features', jsonb_agg(feature)
) AS geoJSON
FROM (
  SELECT jsonb_build_object(
    'type',       'Feature',
    'id',         qc_id,
    'geometry',   ST_AsGeoJSON(wkb_geometry)::jsonb,
    'properties', to_jsonb(row) - 'qc_id' - 'wkb_geometry'
  ) AS feature
  FROM (SELECT * FROM $1~) AS row) AS features;