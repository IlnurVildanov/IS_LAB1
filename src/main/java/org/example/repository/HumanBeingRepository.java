package org.example.repository;

import org.example.entity.HumanBeing;
import org.example.entity.WeaponType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HumanBeingRepository extends JpaRepository<HumanBeing, Long> {

    Optional<HumanBeing> findById(Long id);

    Page<HumanBeing> findAll(Pageable pageable);

    @Query("SELECT h FROM HumanBeing h WHERE h.weaponType = :weaponType")
    List<HumanBeing> findByWeaponType(@Param("weaponType") WeaponType weaponType);

    @Query("SELECT h FROM HumanBeing h WHERE h.name LIKE %:substring%")
    List<HumanBeing> findByNameContaining(@Param("substring") String substring);

    @Query("SELECT AVG(h.impactSpeed) FROM HumanBeing h")
    Double getAverageImpactSpeed();

    @Query("SELECT h FROM HumanBeing h WHERE h.realHero = true")
    List<HumanBeing> findAllRealHeroes();

    @Query("SELECT h FROM HumanBeing h WHERE (h.car.name IS NULL OR h.car.name = '') AND h.realHero = true")
    List<HumanBeing> findAllHeroesWithoutCar();

    @Query("SELECT COUNT(h) FROM HumanBeing h WHERE h.coordinates.id = :coordinatesId")
    Long countByCoordinatesId(@Param("coordinatesId") Long coordinatesId);

    @Query("SELECT COUNT(h) FROM HumanBeing h WHERE h.car.id = :carId")
    Long countByCarId(@Param("carId") Long carId);

    @Query("SELECT h FROM HumanBeing h WHERE h.name = :value")
    Page<HumanBeing> findByNameExact(@Param("value") String value, Pageable pageable);

    @Query("SELECT h FROM HumanBeing h WHERE h.car.name = :value")
    Page<HumanBeing> findByCarNameExact(@Param("value") String value, Pageable pageable);

    @Query("SELECT h FROM HumanBeing h WHERE CAST(h.mood AS string) = :value")
    Page<HumanBeing> findByMoodExact(@Param("value") String value, Pageable pageable);

    @Query("SELECT h FROM HumanBeing h WHERE CAST(h.weaponType AS string) = :value")
    Page<HumanBeing> findByWeaponTypeExact(@Param("value") String value, Pageable pageable);
}