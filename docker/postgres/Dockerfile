FROM postgis/postgis:16-3.4

WORKDIR /wafflemap_db_init

# setup pgrouting
ENV PGROUTING_VERSION 3.6.1
ENV PGROUTING_SHA256 30231dfe01211f709fca9ac0140454ba6bd812f2b7f45fb30222169cd4e8b061

RUN set -ex \
    && apt update \
    && apt install -y \
    libboost-atomic1.74.0 \
    libboost-chrono1.74.0 \
    libboost-graph1.74.0 \
    libboost-date-time1.74.0 \
    libboost-program-options1.74.0 \
    libboost-system1.74.0 \
    libboost-thread1.74.0 \
    && apt install -y \
    build-essential \
    cmake \
    wget \
    libboost-graph-dev \
    libpq-dev \
    postgresql-server-dev-${PG_MAJOR} \
    && wget -O pgrouting.tar.gz "https://github.com/pgRouting/pgrouting/archive/v${PGROUTING_VERSION}.tar.gz" \
    && echo "$PGROUTING_SHA256 *pgrouting.tar.gz" | sha256sum -c - \
    && mkdir -p /usr/src/pgrouting \
    && tar \
    --extract \
    --file pgrouting.tar.gz \
    --directory /usr/src/pgrouting \
    --strip-components 1 \
    && rm pgrouting.tar.gz \
    && cd /usr/src/pgrouting \
    && mkdir build \
    && cd build \
    && cmake .. \
    && make \
    && make install \
    && cd / \
    && rm -rf /usr/src/pgrouting \
    && apt-mark manual postgresql-16 \
    && apt purge -y --autoremove \
    build-essential \
    cmake \
    wget \
    libpq-dev \
    libboost-graph-dev \
    postgresql-server-dev-${PG_MAJOR} \
    && rm -rf /var/lib/apt/lists/*

# setup init
COPY ./requirements.txt .
COPY ./download_insert_osm_data.py .

RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y python3.9 python3-pip
RUN python3 -m pip install -r ./requirements.txt
RUN chmod 777 .