package at.friedrichbachinger.mainappfcb.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import at.friedrichbachinger.mainappfcb.entity.elements.Knowledge;

public interface KnowledgeRepository extends JpaRepository<Knowledge, Integer> {

}