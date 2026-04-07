import {
  nodeSchema,
  domainConfigSchema,
  type Node,
  type DomainConfig,
} from './schemas'

// Import config
import gisConfigRaw from '../../content/gis/config.yaml'

// Import Group nodes
import coreConceptsGroupRaw from '../../content/gis/nodes/core-concepts-group.yaml'
import spatialReferenceSystemsGroupRaw from '../../content/gis/nodes/spatial-reference-systems-group.yaml'
import dataModelsGroupRaw from '../../content/gis/nodes/data-models-group.yaml'
import dataFormatsGroupRaw from '../../content/gis/nodes/data-formats-group.yaml'
import processingToolsGroupRaw from '../../content/gis/nodes/processing-tools-group.yaml'
import analysisLibrariesGroupRaw from '../../content/gis/nodes/analysis-libraries-group.yaml'
import gisServersServicesGroupRaw from '../../content/gis/nodes/gis-servers-services-group.yaml'
import tileDeliverySystemsGroupRaw from '../../content/gis/nodes/tile-delivery-systems-group.yaml'
import webMappingLibrariesGroupRaw from '../../content/gis/nodes/web-mapping-group.yaml'
import desktopGisApplicationsGroupRaw from '../../content/gis/nodes/desktop-gis-group.yaml'
import spatialDatabasesGroupRaw from '../../content/gis/nodes/spatial-databases-group.yaml'
import cloudGisPlatformsGroupRaw from '../../content/gis/nodes/cloud-platforms-group.yaml'
import remoteSensingGroupRaw from '../../content/gis/nodes/remote-sensing-group.yaml'

// Core Concepts
import layerRaw from '../../content/gis/nodes/layer.yaml'
import featureRaw from '../../content/gis/nodes/feature.yaml'
import attributeRaw from '../../content/gis/nodes/attribute.yaml'
import geometryRaw from '../../content/gis/nodes/geometry.yaml'
import vectorDataRaw from '../../content/gis/nodes/vector-data.yaml'
import rasterDataRaw from '../../content/gis/nodes/raster-data.yaml'
import topologyRaw from '../../content/gis/nodes/topology.yaml'
import spatialIndexRaw from '../../content/gis/nodes/spatial-index.yaml'
import georeferencingRaw from '../../content/gis/nodes/georeferencing.yaml'
import metadataRaw from '../../content/gis/nodes/metadata.yaml'
import resolutionRaw from '../../content/gis/nodes/resolution.yaml'
import scaleRaw from '../../content/gis/nodes/scale.yaml'
import accuracyRaw from '../../content/gis/nodes/accuracy.yaml'

// Spatial Reference Systems
import crsRaw from '../../content/gis/nodes/crs.yaml'
import datumRaw from '../../content/gis/nodes/datum.yaml'
import mapProjectionRaw from '../../content/gis/nodes/projection.yaml'
import wgs84Raw from '../../content/gis/nodes/wgs84.yaml'
import webMercatorRaw from '../../content/gis/nodes/web-mercator.yaml'
import utmRaw from '../../content/gis/nodes/utm.yaml'
import epsgCodesRaw from '../../content/gis/nodes/epsg-codes.yaml'
import reprojectionRaw from '../../content/gis/nodes/reprojection.yaml'

// Data Models
import pointRaw from '../../content/gis/nodes/point.yaml'
import lineRaw from '../../content/gis/nodes/line.yaml'
import polygonRaw from '../../content/gis/nodes/polygon.yaml'
import rasterGridRaw from '../../content/gis/nodes/raster-grid.yaml'
import pointCloudRaw from '../../content/gis/nodes/point-cloud.yaml'
import demDsmRaw from '../../content/gis/nodes/dem-dsm.yaml'
import networkDatasetRaw from '../../content/gis/nodes/network-dataset.yaml'
import tiles3dRaw from '../../content/gis/nodes/3d-tiles.yaml'

// Data Formats
import geojsonRaw from '../../content/gis/nodes/geojson.yaml'
import shapefileRaw from '../../content/gis/nodes/shapefile.yaml'
import kmlRaw from '../../content/gis/nodes/kml.yaml'
import geotiffRaw from '../../content/gis/nodes/geotiff.yaml'
import cogRaw from '../../content/gis/nodes/cog.yaml'
import gpkgRaw from '../../content/gis/nodes/gpkg.yaml'
import flatgeobufRaw from '../../content/gis/nodes/flatgeobuf.yaml'
import lasLazRaw from '../../content/gis/nodes/las-laz.yaml'
import czmlRaw from '../../content/gis/nodes/czml.yaml'

// Processing Tools
import gdalRaw from '../../content/gis/nodes/gdal.yaml'
import ogrRaw from '../../content/gis/nodes/ogr.yaml'
import rasterioRaw from '../../content/gis/nodes/rasterio.yaml'
import fionaRaw from '../../content/gis/nodes/fiona.yaml'
import pdalRaw from '../../content/gis/nodes/pdal.yaml'
import tippecanoRaw from '../../content/gis/nodes/tippecanoe.yaml'

// Analysis Libraries
import turfRaw from '../../content/gis/nodes/turf.yaml'
import jstsRaw from '../../content/gis/nodes/jsts.yaml'
import shapelyRaw from '../../content/gis/nodes/shapely.yaml'
import geopandasRaw from '../../content/gis/nodes/geopandas.yaml'
import postgisfunctionsRaw from '../../content/gis/nodes/postgis-functions.yaml'

// GIS Servers & Services
import geoserverRaw from '../../content/gis/nodes/geoserver.yaml'
import mapserverRaw from '../../content/gis/nodes/mapserver.yaml'
import arcgisServerRaw from '../../content/gis/nodes/arcgis-server.yaml'
import wmsRaw from '../../content/gis/nodes/wms.yaml'
import wfsRaw from '../../content/gis/nodes/wfs.yaml'
import wmtsRaw from '../../content/gis/nodes/wmts.yaml'
import wcsRaw from '../../content/gis/nodes/wcs.yaml'
import ogcApiFeaturesRaw from '../../content/gis/nodes/ogc-api-features.yaml'

// Tile & Delivery Systems
import mvtRaw from '../../content/gis/nodes/mvt.yaml'
import xyzTilesRaw from '../../content/gis/nodes/xyz-tiles.yaml'
import tmsRaw from '../../content/gis/nodes/tms.yaml'
import rasterTilesRaw from '../../content/gis/nodes/raster-tiles.yaml'
import vectorTilesRaw from '../../content/gis/nodes/vector-tiles.yaml'
import tileCacheRaw from '../../content/gis/nodes/tile-cache.yaml'
import cdnDeliveryRaw from '../../content/gis/nodes/cdn-delivery.yaml'

// Web Mapping Libraries
import leafletRaw from '../../content/gis/nodes/leaflet.yaml'
import openlayersRaw from '../../content/gis/nodes/openlayers.yaml'
import mapboxGlRaw from '../../content/gis/nodes/mapbox-gl.yaml'
import cesiumRaw from '../../content/gis/nodes/cesium.yaml'
import deckGlRaw from '../../content/gis/nodes/deck-gl.yaml'
import d3GeoRaw from '../../content/gis/nodes/d3-geo.yaml'

// Desktop GIS Applications
import qgisRaw from '../../content/gis/nodes/qgis.yaml'
import arcgisProRaw from '../../content/gis/nodes/arcgis-pro.yaml'
import grassGisRaw from '../../content/gis/nodes/grass-gis.yaml'

// Spatial Databases
import postgisRaw from '../../content/gis/nodes/postgis.yaml'
import spatialiteRaw from '../../content/gis/nodes/spatialite.yaml'
import oracleSpatialRaw from '../../content/gis/nodes/oracle-spatial.yaml'
import duckdbSpatialRaw from '../../content/gis/nodes/duckdb-spatial.yaml'

// Cloud GIS Platforms
import feltRaw from '../../content/gis/nodes/felt.yaml'
import arcgisOnlineRaw from '../../content/gis/nodes/arcgis-online.yaml'
import cartoRaw from '../../content/gis/nodes/carto.yaml'
import googleEarthEngineRaw from '../../content/gis/nodes/google-earth-engine.yaml'
import mapboxPlatformRaw from '../../content/gis/nodes/mapbox-platform.yaml'
import keplerGlRaw from '../../content/gis/nodes/kepler-gl.yaml'

// Remote Sensing
import satelliteImageryRaw from '../../content/gis/nodes/satellite-imagery.yaml'
import aerialImageryRaw from '../../content/gis/nodes/aerial-imagery.yaml'
import lidarRaw from '../../content/gis/nodes/lidar.yaml'
import sarRaw from '../../content/gis/nodes/sar.yaml'
import imageClassificationRaw from '../../content/gis/nodes/image-classification.yaml'
import spectralAnalysisRaw from '../../content/gis/nodes/spectral-analysis.yaml'
import orthorectificationRaw from '../../content/gis/nodes/orthorectification.yaml'
import changeDetectionRaw from '../../content/gis/nodes/change-detection.yaml'

export interface LoadedContent {
  config: DomainConfig
  nodes: Node[]
  errors: string[]
}

/**
 * Validates a node against the schema
 */
function validateNode(data: unknown, nodeId: string): { node?: Node; error?: string } {
  try {
    const node = nodeSchema.parse(data)
    return { node }
  } catch (error) {
    return {
      error: `Validation error in node ${nodeId}: ${error instanceof Error ? error.message : String(error)}`,
    }
  }
}

/**
 * Validates domain config against the schema
 */
function validateConfig(data: unknown): { config?: DomainConfig; error?: string } {
  try {
    const config = domainConfigSchema.parse(data)
    return { config }
  } catch (error) {
    return {
      error: `Validation error in config: ${error instanceof Error ? error.message : String(error)}`,
    }
  }
}

/**
 * Loads all GIS content
 */
export function loadGISContent(): LoadedContent {
  const errors: string[] = []
  const nodes: Node[] = []

  // Validate and load config
  const configResult = validateConfig(gisConfigRaw)
  if (configResult.error) {
    errors.push(configResult.error)
  }

  const config = configResult.config || {
    domain: 'gis',
    displayName: 'GIS',
    version: '1.0.0',
    description: '',
    icon: 'map',
    color: '#10B981',
    nodeTypes: [],
    relationshipTypes: [],
    categories: [],
    roles: [],
  }

  // Load all node files
  const nodeFiles = [
    // Group nodes (load first)
    { id: 'core-concepts-group', data: coreConceptsGroupRaw },
    { id: 'spatial-reference-systems-group', data: spatialReferenceSystemsGroupRaw },
    { id: 'data-models-group', data: dataModelsGroupRaw },
    { id: 'data-formats-group', data: dataFormatsGroupRaw },
    { id: 'processing-tools-group', data: processingToolsGroupRaw },
    { id: 'analysis-libraries-group', data: analysisLibrariesGroupRaw },
    { id: 'gis-servers-services-group', data: gisServersServicesGroupRaw },
    { id: 'tile-delivery-systems-group', data: tileDeliverySystemsGroupRaw },
    { id: 'web-mapping-libraries-group', data: webMappingLibrariesGroupRaw },
    { id: 'desktop-gis-applications-group', data: desktopGisApplicationsGroupRaw },
    { id: 'spatial-databases-group', data: spatialDatabasesGroupRaw },
    { id: 'cloud-gis-platforms-group', data: cloudGisPlatformsGroupRaw },
    { id: 'remote-sensing-group', data: remoteSensingGroupRaw },

    // Core Concepts
    { id: 'layer', data: layerRaw },
    { id: 'feature', data: featureRaw },
    { id: 'attribute', data: attributeRaw },
    { id: 'geometry', data: geometryRaw },
    { id: 'vector-data', data: vectorDataRaw },
    { id: 'raster-data', data: rasterDataRaw },
    { id: 'topology', data: topologyRaw },
    { id: 'spatial-index', data: spatialIndexRaw },
    { id: 'georeferencing', data: georeferencingRaw },
    { id: 'metadata', data: metadataRaw },
    { id: 'resolution', data: resolutionRaw },
    { id: 'scale', data: scaleRaw },
    { id: 'accuracy', data: accuracyRaw },

    // Spatial Reference Systems
    { id: 'crs', data: crsRaw },
    { id: 'datum', data: datumRaw },
    { id: 'map-projection', data: mapProjectionRaw },
    { id: 'wgs84', data: wgs84Raw },
    { id: 'web-mercator', data: webMercatorRaw },
    { id: 'utm', data: utmRaw },
    { id: 'epsg-codes', data: epsgCodesRaw },
    { id: 'reprojection', data: reprojectionRaw },

    // Data Models
    { id: 'point', data: pointRaw },
    { id: 'line', data: lineRaw },
    { id: 'polygon', data: polygonRaw },
    { id: 'raster-grid', data: rasterGridRaw },
    { id: 'point-cloud', data: pointCloudRaw },
    { id: 'dem-dsm', data: demDsmRaw },
    { id: 'network-dataset', data: networkDatasetRaw },
    { id: '3d-tiles', data: tiles3dRaw },

    // Data Formats
    { id: 'geojson', data: geojsonRaw },
    { id: 'shapefile', data: shapefileRaw },
    { id: 'kml', data: kmlRaw },
    { id: 'geotiff', data: geotiffRaw },
    { id: 'cog', data: cogRaw },
    { id: 'gpkg', data: gpkgRaw },
    { id: 'flatgeobuf', data: flatgeobufRaw },
    { id: 'las-laz', data: lasLazRaw },
    { id: 'czml', data: czmlRaw },

    // Processing Tools
    { id: 'gdal', data: gdalRaw },
    { id: 'ogr', data: ogrRaw },
    { id: 'rasterio', data: rasterioRaw },
    { id: 'fiona', data: fionaRaw },
    { id: 'pdal', data: pdalRaw },
    { id: 'tippecanoe', data: tippecanoRaw },

    // Analysis Libraries
    { id: 'turf', data: turfRaw },
    { id: 'jsts', data: jstsRaw },
    { id: 'shapely', data: shapelyRaw },
    { id: 'geopandas', data: geopandasRaw },
    { id: 'postgis-functions', data: postgisfunctionsRaw },

    // GIS Servers & Services
    { id: 'geoserver', data: geoserverRaw },
    { id: 'mapserver', data: mapserverRaw },
    { id: 'arcgis-server', data: arcgisServerRaw },
    { id: 'wms', data: wmsRaw },
    { id: 'wfs', data: wfsRaw },
    { id: 'wmts', data: wmtsRaw },
    { id: 'wcs', data: wcsRaw },
    { id: 'ogc-api-features', data: ogcApiFeaturesRaw },

    // Tile & Delivery Systems
    { id: 'mvt', data: mvtRaw },
    { id: 'xyz-tiles', data: xyzTilesRaw },
    { id: 'tms', data: tmsRaw },
    { id: 'raster-tiles', data: rasterTilesRaw },
    { id: 'vector-tiles', data: vectorTilesRaw },
    { id: 'tile-cache', data: tileCacheRaw },
    { id: 'cdn-delivery', data: cdnDeliveryRaw },

    // Web Mapping Libraries
    { id: 'leaflet', data: leafletRaw },
    { id: 'openlayers', data: openlayersRaw },
    { id: 'mapbox-gl', data: mapboxGlRaw },
    { id: 'cesium', data: cesiumRaw },
    { id: 'deck-gl', data: deckGlRaw },
    { id: 'd3-geo', data: d3GeoRaw },

    // Desktop GIS Applications
    { id: 'qgis', data: qgisRaw },
    { id: 'arcgis-pro', data: arcgisProRaw },
    { id: 'grass-gis', data: grassGisRaw },

    // Spatial Databases
    { id: 'postgis', data: postgisRaw },
    { id: 'spatialite', data: spatialiteRaw },
    { id: 'oracle-spatial', data: oracleSpatialRaw },
    { id: 'duckdb-spatial', data: duckdbSpatialRaw },

    // Cloud GIS Platforms
    { id: 'felt', data: feltRaw },
    { id: 'arcgis-online', data: arcgisOnlineRaw },
    { id: 'carto', data: cartoRaw },
    { id: 'google-earth-engine', data: googleEarthEngineRaw },
    { id: 'mapbox-platform', data: mapboxPlatformRaw },
    { id: 'kepler-gl', data: keplerGlRaw },

    // Remote Sensing
    { id: 'satellite-imagery', data: satelliteImageryRaw },
    { id: 'aerial-imagery', data: aerialImageryRaw },
    { id: 'lidar', data: lidarRaw },
    { id: 'sar', data: sarRaw },
    { id: 'image-classification', data: imageClassificationRaw },
    { id: 'spectral-analysis', data: spectralAnalysisRaw },
    { id: 'orthorectification', data: orthorectificationRaw },
    { id: 'change-detection', data: changeDetectionRaw },
  ]

  // Validate and load each node
  for (const { id, data } of nodeFiles) {
    const result = validateNode(data, id)
    if (result.error) {
      errors.push(result.error)
    } else if (result.node) {
      nodes.push(result.node)
    }
  }

  return {
    config,
    nodes,
    errors,
  }
}

/**
 * Gets nodes by category
 */
export function getNodesByCategory(nodes: Node[], category: string): Node[] {
  return nodes.filter((node) => node.category === category)
}

/**
 * Gets nodes by type
 */
export function getNodesByType(nodes: Node[], type: string): Node[] {
  return nodes.filter((node) => node.type === type)
}

/**
 * Finds a node by ID
 */
export function findNodeById(nodes: Node[], id: string): Node | undefined {
  return nodes.find((node) => node.id === id)
}

/**
 * Gets all related node IDs from a node's relationships
 */
export function getRelatedNodeIds(node: Node): string[] {
  const relatedIds = new Set<string>()

  if (node.relationships) {
    Object.values(node.relationships).forEach((ids) => {
      if (Array.isArray(ids)) {
        ids.forEach((id) => relatedIds.add(id))
      }
    })
  }

  return Array.from(relatedIds)
}

/**
 * Validates that all relationship references exist
 */
export function validateRelationships(nodes: Node[]): string[] {
  const errors: string[] = []
  const nodeIds = new Set(nodes.map((n) => n.id))

  nodes.forEach((node) => {
    const relatedIds = getRelatedNodeIds(node)
    relatedIds.forEach((relatedId) => {
      if (!nodeIds.has(relatedId)) {
        errors.push(
          `Node "${node.id}" references non-existent node "${relatedId}" in relationships`
        )
      }
    })
  })

  return errors
}
