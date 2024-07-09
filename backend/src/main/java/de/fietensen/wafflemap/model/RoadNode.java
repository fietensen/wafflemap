package de.fietensen.wafflemap.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import org.locationtech.jts.geom.Geometry;

@Getter
@Entity
@Table(schema = "public", name = "location_roads_verts")
public class RoadNode {
    @Id
    private Long id;

    private Double y;
    private Double x;

    @Column(name = "street_count")
    private Long streetCount;

    private String ref;
    private String highway;
    private Geometry geometry;
}
