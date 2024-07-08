package de.fietensen.wafflemap.dto;

import lombok.Data;

import java.util.List;

@Data
public class RoadResultsDTO {
    // Link to next Results (generated based on limit)
    private String next;
    private List<RoadResultDTO> results;
}
