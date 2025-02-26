package de.fietensen.wafflemap.repository;

import de.fietensen.wafflemap.model.DummyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoadSearchRepository extends JpaRepository<DummyEntity, Long> {
    @Query(value = "SELECT name, y, x, u FROM (SELECT name, u, v, ROW_NUMBER() OVER(PARTITION BY name ORDER BY ID DESC) AS rn FROM \"public\".location_roads_edges) b INNER JOIN \"public\".location_roads_verts a ON u = a.id WHERE rn = 1 AND name ILIKE :name% AND NOT SUBSTRING(name, 1, 1) LIKE '['  LIMIT :limit OFFSET :skip", nativeQuery = true)
    List<Object[]> findRoadsByName(@Param("name") String name,
                                   @Param("limit") Long limit,
                                   @Param("skip") Long skip);

    @Query(value = "SELECT edge.id, edge.x, edge.y, ST_DistanceSphere(edge.geometry, ST_SetSRID(ST_MakePoint(:lon, :lat), 4326)) as dist FROM public.location_roads_verts edge ORDER BY dist LIMIT :limit OFFSET :skip", nativeQuery = true)
    List<Object[]> findClosestNodes(@Param("lat") Double lat,
                                    @Param("lon") Double lon,
                                    @Param("limit") Long limit,
                                    @Param("skip") Long skip);

    @Query(value = "SELECT pd.edge, pd.cost, ST_AsEWKB(ed.geometry) FROM pgr_dijkstra('SELECT id, u as source, v as target, length as cost FROM location_roads_edges', :from, :to, TRUE) pd INNER JOIN location_roads_edges ed ON ed.id = pd.edge WHERE pd.edge != -1 ORDER BY pd.path_seq", nativeQuery = true)
    List<Object[]> findPathFromAToB(@Param("from") Long from, @Param("to") Long to);
}
