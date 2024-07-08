package de.fietensen.wafflemap.repository;


import de.fietensen.wafflemap.model.RoadNode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoadNodeRepository extends JpaRepository<RoadNode, Long> {
}
