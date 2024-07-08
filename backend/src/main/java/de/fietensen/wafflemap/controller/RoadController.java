package de.fietensen.wafflemap.controller;

import de.fietensen.wafflemap.dto.RoadDistDTO;
import de.fietensen.wafflemap.dto.RoadEdgeDTO;
import de.fietensen.wafflemap.dto.RoadResultsDTO;
import de.fietensen.wafflemap.dto.RouteDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/road")
@RequiredArgsConstructor
@Validated
public class RoadController {
    @GetMapping("/{id}")
    public ResponseEntity<RoadEdgeDTO> getEdgeById(@PathVariable Long id) {
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<RoadResultsDTO> findRoadByName(@RequestParam("name") String name) {
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search/closest")
    public ResponseEntity<RoadDistDTO> findRoadByLocation(@RequestParam("lat") Double lat, @RequestParam("lon") Double lon) {
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/route/{fromNodeId}/{toNodeId}")
    public ResponseEntity<RouteDTO> getRouteByNodeIds(@PathVariable Long fromNodeId, @PathVariable Long toNodeId) {
        return ResponseEntity.noContent().build();
    }
}
