package de.fietensen.wafflemap.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import org.locationtech.jts.geom.Geometry;

@Getter
@Entity
@Table(schema = "public", name = "location_roads_edges")
public class RoadEdge {
    @Id
    private Long id;
    private Long u;
    private Long v;
    private Long key;
    private String osmid;
    private String lanes;
    private String name;
    private String highway;
    private String maxspeed;
    private Boolean oneway;
    private String reversed;
    private Double length;
    private String width;
    private String ref;
    private String bridge;
    private String tunnel;
    private String junction;
    private String access;
    private String area;
    private String service;
    private String est_width;

    private Geometry geometry;
}