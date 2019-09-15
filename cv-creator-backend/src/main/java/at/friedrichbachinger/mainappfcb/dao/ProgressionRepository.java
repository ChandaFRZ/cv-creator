package at.friedrichbachinger.mainappfcb.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import at.friedrichbachinger.mainappfcb.entity.elements.Progression;

public interface ProgressionRepository extends JpaRepository<Progression, Integer> {
}