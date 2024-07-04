package de.fietensen.wafflemap.dto;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonRawValue;
import lombok.Data;
import lombok.Getter;
import org.geotools.geojson.geom.GeometryJSON;
import org.locationtech.jts.geom.Geometry;

@Data
public class RoadEdgeDTO {
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

    @JsonIgnore
    private Geometry geometry;

    @JsonRawValue
    @JsonGetter("geometry")
    public String getGeometryAsString() {
        if (geometry != null) {
            return new GeometryJSON().toString(geometry);
        }
        return null;
    }
}
