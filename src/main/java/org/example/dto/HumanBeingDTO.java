package org.example.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.entity.Mood;
import org.example.entity.WeaponType;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HumanBeingDTO {
    private Long id;

    @NotBlank(message = "Name cannot be null or empty")
    @NotNull
    private String name;

    @NotNull(message = "Coordinates cannot be null")
    private CoordinatesDTO coordinates;

    private Date creationDate;

    @NotNull(message = "Real hero field cannot be null")
    private Boolean realHero;

    private Boolean hasToothpick;

    @NotNull(message = "Car cannot be null")
    private CarDTO car;

    @NotNull(message = "Mood cannot be null")
    private Mood mood;

    @NotNull(message = "Impact speed cannot be null")
    @Max(value = 345, message = "Impact speed cannot exceed 345")
    private Float impactSpeed;

    @NotNull(message = "Minutes of waiting cannot be null")
    private Float minutesOfWaiting;

    private WeaponType weaponType;
}