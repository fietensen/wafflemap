FROM postgis/postgis:16-3.4

WORKDIR /wafflemap_db_init

COPY ./requirements.txt .
COPY ./download_insert_osm_data.py .

RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y python3.9 python3-pip
RUN python3 -m pip install -r ./requirements.txt