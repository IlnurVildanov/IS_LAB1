package org.example.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "human_beings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HumanBeing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, unique = true)
    private Long id;

    @Column(nullable = false)
    @NotBlank(message = "Name cannot be null or empty")
    @NotNull
    private String name;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.EAGER)
    @JoinColumn(name = "coordinates_id", nullable = false)
    @NotNull
    private Coordinates coordinates;

    @Column(name = "creation_date", nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @NotNull
    private Date creationDate;

    @Column(name = "real_hero", nullable = false)
    private Boolean realHero;

    @Column(name = "has_toothpick")
    private Boolean hasToothpick;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.EAGER)
    @JoinColumn(name = "car_id", nullable = false)
    @NotNull
    private Car car;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @NotNull
    private Mood mood;

    @Column(name = "impact_speed", nullable = false, columnDefinition = "real check (impact_speed <= 345)")
    @NotNull
    @Max(value = 345, message = "Impact speed cannot exceed 345")
    private Float impactSpeed;

    @Column(name = "minutes_of_waiting", nullable = false)
    @NotNull
    private Float minutesOfWaiting;

    @Enumerated(EnumType.STRING)
    @Column(name = "weapon_type")
    private WeaponType weaponType;

    @PrePersist
    protected void onCreate() {
        if (creationDate == null) {
            creationDate = new Date();
        }
        if (impactSpeed != null && impactSpeed > 345) {
            throw new IllegalArgumentException("Impact speed cannot exceed 345");
        }
    }

    @PreUpdate
    private void validateImpactSpeed() {
        if (impactSpeed != null && impactSpeed > 345) {
            throw new IllegalArgumentException("Impact speed cannot exceed 345");
        }
    }
}