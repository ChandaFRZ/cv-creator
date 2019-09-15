package at.friedrichbachinger.mainappfcb.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import at.friedrichbachinger.mainappfcb.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Integer> {
}
