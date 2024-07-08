package de.fietensen.wafflemap.dto;

import lombok.Data;

import java.util.List;

@Data
public class RouteDTO {
    private Double distance;
    private List<Long> ids;
}
