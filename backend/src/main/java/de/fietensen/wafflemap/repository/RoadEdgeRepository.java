package de.fietensen.wafflemap.repository;

import de.fietensen.wafflemap.model.RoadEdge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoadEdgeRepository extends JpaRepository<RoadEdge, Long> {
}
