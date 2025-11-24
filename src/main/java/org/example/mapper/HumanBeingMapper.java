package org.example.mapper;

import org.example.dto.*;
import org.example.entity.*;
import org.springframework.stereotype.Component;

@Component
public class HumanBeingMapper {

    public HumanBeingDTO toDTO(HumanBeing entity) {
        if (entity == null) return null;

        HumanBeingDTO dto = new HumanBeingDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setCoordinates(toCoordinatesDTO(entity.getCoordinates()));
        dto.setCreationDate(entity.getCreationDate());
        dto.setRealHero(entity.getRealHero());
        dto.setHasToothpick(entity.getHasToothpick());
        dto.setCar(toCarDTO(entity.getCar()));
        dto.setMood(entity.getMood());
        dto.setImpactSpeed(entity.getImpactSpeed());
        dto.setMinutesOfWaiting(entity.getMinutesOfWaiting());
        dto.setWeaponType(entity.getWeaponType());
        return dto;
    }

    public HumanBeing toEntity(HumanBeingDTO dto) {
        if (dto == null) return null;

        HumanBeing entity = new HumanBeing();
        entity.setId(dto.getId());
        entity.setName(dto.getName());
        entity.setCoordinates(toCoordinatesEntity(dto.getCoordinates()));
        entity.setCreationDate(dto.getCreationDate());
        entity.setRealHero(dto.getRealHero());
        entity.setHasToothpick(dto.getHasToothpick());
        entity.setCar(toCarEntity(dto.getCar()));
        entity.setMood(dto.getMood());
        entity.setImpactSpeed(dto.getImpactSpeed());
        entity.setMinutesOfWaiting(dto.getMinutesOfWaiting());
        entity.setWeaponType(dto.getWeaponType());
        return entity;
    }

    public CoordinatesDTO toCoordinatesDTO(Coordinates entity) {
        if (entity == null) return null;

        CoordinatesDTO dto = new CoordinatesDTO();
        dto.setId(entity.getId());
        dto.setX(entity.getX());
        dto.setY(entity.getY());
        return dto;
    }

    public Coordinates toCoordinatesEntity(CoordinatesDTO dto) {
        if (dto == null) return null;

        Coordinates entity = new Coordinates();
        entity.setId(dto.getId());
        entity.setX(dto.getX());
        entity.setY(dto.getY());
        return entity;
    }

    public CarDTO toCarDTO(Car entity) {
        if (entity == null) return null;

        CarDTO dto = new CarDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        return dto;
    }

    public Car toCarEntity(CarDTO dto) {
        if (dto == null) return null;

        Car entity = new Car();
        entity.setId(dto.getId());
        entity.setName(dto.getName());
        return entity;
    }
}