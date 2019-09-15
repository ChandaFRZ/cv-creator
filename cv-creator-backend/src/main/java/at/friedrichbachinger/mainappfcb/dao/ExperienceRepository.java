package at.friedrichbachinger.mainappfcb.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import at.friedrichbachinger.mainappfcb.entity.elements.Experience;

public interface ExperienceRepository extends JpaRepository<Experience, Integer> {

}