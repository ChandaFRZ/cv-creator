package at.friedrichbachinger.mainappfcb.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import at.friedrichbachinger.mainappfcb.entity.ImageDAO;

public interface ImageRepository extends JpaRepository<ImageDAO, Integer> {
}