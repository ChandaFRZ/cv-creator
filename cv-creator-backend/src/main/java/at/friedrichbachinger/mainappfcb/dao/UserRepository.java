package at.friedrichbachinger.mainappfcb.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import at.friedrichbachinger.mainappfcb.entity.UserDAO;

public interface UserRepository extends JpaRepository<UserDAO, Integer> {

    Optional<UserDAO> findByEmail(String email);
}
