import osmnx as ox
from sqlalchemy import create_engine, sql
import os

TARGET_URI          = os.environ['OSM_INIT_TARGET_URI']
VERTICES_TABLE      = os.environ['OSM_INIT_TABLE_VERTICES']
EDGES_TABLE         = os.environ['OSM_INIT_TABLE_EDGES']
TARGET_LOCATION     = os.environ['OSM_INIT_PLACE']
TARGET_NETWORK_TYPE = os.environ['OSM_INIT_NETWORK_TYPE']

print("[*] Creating PostgreSQL engine")
engine = create_engine(TARGET_URI)
print("[*] Done creating engine")

print("[*] Retrieving graph data for place \"{}\" from OSM".format(TARGET_LOCATION))
vertices, edges = ox.graph_to_gdfs(ox.graph_from_place(TARGET_LOCATION, network_type = TARGET_NETWORK_TYPE))
print("[*] Done retrieving graph data")

def lonlat_to_tile(lon, lat, x_range, y_range, tile_size=0.01):
    x_tile = int((lon - x_range[0]) / tile_size)
    y_tile = int((lat - y_range[0]) / tile_size)
    return x_tile, y_tile

x_range, y_range = (min(vertices['x']), max(vertices['x'])), (min(vertices['y']), max(vertices['y']))

print("[*] Calculating tile IDs")
vertices[['tile_x', 'tile_y']] = vertices.apply(
    lambda row: lonlat_to_tile(row['x'], row['y'], x_range, y_range), axis=1, result_type='expand'
)
print("[*] Done assigning tile IDs")

print("[*] Setting row indices")
edges.reset_index(inplace=True)
vertices.index.name = 'id'
print("[*] Done setting row indices")

print("[*] Exporting graph to PostGIS")
edges.to_postgis(EDGES_TABLE, engine, if_exists='replace', index=True, index_label="id")
vertices.to_postgis(VERTICES_TABLE, engine, if_exists='replace', index=True, index_label="id")

with engine.connect() as conn:
    conn.execute(sql.text('ALTER TABLE "{}" ADD PRIMARY KEY ("id");'.format(EDGES_TABLE)))
    conn.execute(sql.text('ALTER TABLE "{}" ADD PRIMARY KEY ("id");'.format(VERTICES_TABLE)))
    conn.commit()
print("[*] Done exporting data")