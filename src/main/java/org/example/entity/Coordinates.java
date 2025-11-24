package org.example.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "coordinates")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Coordinates {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, columnDefinition = "integer check (x <= 112)")
    @Max(112)
    @NotNull
    private Integer x;

    @Column(nullable = false, columnDefinition = "double precision check (y > -926)")
    @NotNull
    private Double y;

    @PrePersist
    @PreUpdate
    private void validate() {
        if (y != null && y <= -926) {
            throw new IllegalArgumentException("Y coordinate must be greater than -926");
        }
        if (x != null && x > 112) {
            throw new IllegalArgumentException("X coordinate cannot exceed 112");
        }
    }
}