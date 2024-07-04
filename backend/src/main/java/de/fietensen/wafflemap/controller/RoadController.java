package de.fietensen.wafflemap.controller;

import de.fietensen.wafflemap.dto.RoadEdgeDTO;
import de.fietensen.wafflemap.model.RoadEdge;
import de.fietensen.wafflemap.repository.RoadEdgeRepository;
import de.fietensen.wafflemap.repository.RoadLocationRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/road")
@RequiredArgsConstructor
@Validated
public class RoadController {
    @Autowired
    private RoadEdgeRepository roadEdgeRepository;

    @Autowired
    private RoadLocationRepository roadLocationRepository;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping("/{id}")
    public ResponseEntity<RoadEdgeDTO> getEdgeById(@PathVariable Long id) {
        Optional<RoadEdge> edge = roadEdgeRepository.findById(id);
        if (edge.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        RoadEdgeDTO roadEdgeDTO = modelMapper.map(edge.get(), RoadEdgeDTO.class);
        return ResponseEntity.ok(roadEdgeDTO);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Object[]>> searchRoadLocations(@RequestParam("name") String name) {
        return ResponseEntity.ok(roadLocationRepository.findMatchingItems(name));
    }
}
