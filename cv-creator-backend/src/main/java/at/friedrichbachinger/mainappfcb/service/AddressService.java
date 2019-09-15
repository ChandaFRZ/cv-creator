package at.friedrichbachinger.mainappfcb.service;

import org.springframework.security.core.userdetails.UserDetails;

import at.friedrichbachinger.mainappfcb.entity.elements.Address;

public interface AddressService {

    public Address getUserAddress(UserDetails userDetails);

    public Address addUserAddress(UserDetails userDetails, Address address);

    public Address updateAddress(UserDetails userDetails, Address address);

    public int deleteUserAddress(UserDetails userDetails, Address address);
}