package de.fietensen.wafflemap.dto;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonRawValue;
import lombok.Data;
import org.geotools.geojson.geom.GeometryJSON;
import org.locationtech.jts.geom.Geometry;
import org.locationtech.jts.geom.GeometryCollection;

import java.util.List;

@Data
public class RouteDTO {
    private Double distance;
    private List<Long> ids;

    @JsonIgnore
    private GeometryCollection geometry;

    @JsonRawValue
    @JsonGetter("geometry")
    public String getGeometryAsString() {
        if (geometry != null) {
            return new GeometryJSON().toString((Geometry) geometry);
        }
        return null;
    }
}
