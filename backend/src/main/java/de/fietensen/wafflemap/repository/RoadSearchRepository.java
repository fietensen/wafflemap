package de.fietensen.wafflemap.repository;

import de.fietensen.wafflemap.model.DummyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoadSearchRepository extends JpaRepository<DummyEntity, Long> {
    @Query(value = "SELECT name, x, y FROM (SELECT name, u, v, ROW_NUMBER() OVER(PARTITION BY name ORDER BY ID DESC) AS rn FROM \"public\".location_roads_edges) b INNER JOIN \"public\".location_roads_verts a ON u = a.osmid WHERE rn = 1 AND name ILIKE %:name% AND NOT SUBSTRING(name, 1, 1) LIKE '['  LIMIT :limit OFFSET :skip", nativeQuery = true)
    List<Object[]> findRoadsByName(@Param("name") String name,
                                   @Param("limit") Long limit,
                                   @Param("skip") Long skip);

    @Query(value = "SELECT edge.id, edge.x, edge.y, ST_DistanceSphere(edge.geometry, ST_SetSRID(ST_MakePoint(:lon, :lat), 4326)) as dist FROM public.location_roads_verts edge ORDER BY dist LIMIT :limit OFFSET :skip", nativeQuery = true)
    List<Object[]> findClosestNodes(@Param("lat") Double lat,
                                    @Param("lon") Double lon,
                                    @Param("limit") Long limit,
                                    @Param("skip") Long skip);
}
