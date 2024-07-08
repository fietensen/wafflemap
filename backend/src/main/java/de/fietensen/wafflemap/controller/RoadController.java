package de.fietensen.wafflemap.controller;

import de.fietensen.wafflemap.dto.*;
import de.fietensen.wafflemap.service.RoadService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/road")
@RequiredArgsConstructor
@Validated
public class RoadController {
    private RoadService roadService;

    @Autowired
    public RoadController(RoadService roadService) {
        this.roadService = roadService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoadEdgeDTO> getEdgeById(@PathVariable Long id) {
        RoadEdgeDTO roadEdgeDTO = roadService.getEdgeById(id);
        if (roadEdgeDTO == null)
            return ResponseEntity.notFound().build();

        return ResponseEntity.ok(roadEdgeDTO);
    }

    @GetMapping("/search")
    public ResponseEntity<RoadResultsDTO> findRoadByName(HttpServletRequest request,
                                                         @RequestParam("name") String name,
                                                         @RequestParam(value = "skip", required = false) Long skip,
                                                         @RequestParam(value = "limit", required = false) Long limit) {
        RoadResultsDTO roadResultsDTO = roadService.findRoadByName(request.getRequestURL().toString(), name, skip, limit);
        if (roadResultsDTO == null)
            return ResponseEntity.notFound().build();

        return ResponseEntity.ok(roadResultsDTO);
    }

    @GetMapping("/search/closest")
    public ResponseEntity<RoadDistDTO> findRoadByLocation(@RequestParam("lat") Double lat, @RequestParam("lon") Double lon) {
        RoadDistDTO roadDistDTO = roadService.findRoadByLocation(lat, lon);
        if (roadDistDTO == null)
            return ResponseEntity.notFound().build();

        return ResponseEntity.ok(roadDistDTO);
    }

    @GetMapping("/route/{fromNodeId}/{toNodeId}")
    public ResponseEntity<RouteDTO> getRouteByNodeIds(@PathVariable Long fromNodeId, @PathVariable Long toNodeId) {
        return ResponseEntity.noContent().build();
    }
}
