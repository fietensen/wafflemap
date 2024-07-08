package de.fietensen.wafflemap.repository;

import de.fietensen.wafflemap.model.RoadEdge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoadLocationRepository extends JpaRepository<RoadEdge, Long> {
    @Query(value = "SELECT name, x, y FROM (SELECT name, u, v, ROW_NUMBER() OVER(PARTITION BY name ORDER BY ID DESC) rn FROM public.location_roads_edges) b INNER JOIN public.location_roads_verts a ON u = a.osmid WHERE rn = 1 AND name ILIKE %?1% AND NOT SUBSTRING(name, 1, 1) LIKE '[';", nativeQuery = true)
    List<Object[]> findMatchingItems(String searchTerm);

    @Query(value = "SELECT edge.id, edge.x, edge.y, edge.geometry <-> ST_SetSRID(ST_MakePoint(:lon, :lat), 4326) as dist FROM public.location_roads_verts edge ORDER BY dist LIMIT 1;", nativeQuery = true)
    Object[] findNearestVertex(@Param("lon") Double x, @Param("lat") Double y);
}
