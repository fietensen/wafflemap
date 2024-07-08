package de.fietensen.wafflemap.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class DummyEntity {
    @Id
    @GeneratedValue
    private Long id;
}
