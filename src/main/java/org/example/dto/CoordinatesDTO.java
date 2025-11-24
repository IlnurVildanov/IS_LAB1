package org.example.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CoordinatesDTO {
    private Long id;

    @NotNull(message = "X coordinate cannot be null")
    @Max(value = 112, message = "X coordinate cannot exceed 112")
    private Integer x;

    @NotNull(message = "Y coordinate cannot be null")
    private Double y;
}