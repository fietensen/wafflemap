package de.fietensen.wafflemap.repository;

import de.fietensen.wafflemap.model.RoadEdge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoadLocationRepository extends JpaRepository<RoadEdge, Long> {
    @Query(value = "SELECT name, x, y FROM (SELECT name, u, v, ROW_NUMBER() OVER(PARTITION BY name ORDER BY ID DESC) rn FROM public.location_roads_edges) b INNER JOIN public.location_roads_verts a ON u = a.osmid WHERE rn = 1 AND name ILIKE %?1% AND NOT SUBSTRING(name, 1, 1) LIKE '[';", nativeQuery = true)
    List<Object[]> findMatchingItems(String searchTerm);

}
