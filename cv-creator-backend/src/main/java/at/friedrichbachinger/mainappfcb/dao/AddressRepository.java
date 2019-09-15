package at.friedrichbachinger.mainappfcb.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import at.friedrichbachinger.mainappfcb.entity.elements.Address;

public interface AddressRepository extends JpaRepository<Address, Integer> {

}