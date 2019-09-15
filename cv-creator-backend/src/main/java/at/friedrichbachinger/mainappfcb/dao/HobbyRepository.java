package at.friedrichbachinger.mainappfcb.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import at.friedrichbachinger.mainappfcb.entity.elements.Hobby;

public interface HobbyRepository extends JpaRepository<Hobby, Integer> {

}