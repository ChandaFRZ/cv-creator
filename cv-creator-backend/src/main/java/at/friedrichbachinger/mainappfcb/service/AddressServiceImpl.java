package at.friedrichbachinger.mainappfcb.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import at.friedrichbachinger.mainappfcb.dao.AddressRepository;
import at.friedrichbachinger.mainappfcb.dao.UserRepository;
import at.friedrichbachinger.mainappfcb.entity.UserDAO;
import at.friedrichbachinger.mainappfcb.entity.elements.Address;
import at.friedrichbachinger.mainappfcb.rest.exceptions.UserNotFoundException;

@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    public AddressServiceImpl() {
    }

    @Override
    public Address getUserAddress(UserDetails userDetails) {
        UserDAO user = getUser(userDetails);
        if (user.getAddress() == null) {
            return null;
        }
        return addressRepository.getOne(user.getAddress().getId());
    }

    @Override
    public Address addUserAddress(UserDetails userDetails, Address address) {
        UserDAO user = getUser(userDetails);
        address.setId(0);
        Address addAddress = addressRepository.save(address);
        user.setAddress(address);
        userRepository.save(user);
        return addAddress;
    }

    @Override
    public Address updateAddress(UserDetails userDetails, Address address) {
        UserDAO user = getUser(userDetails);
        Address updateAdress = addressRepository.save(address);
        user.setAddress(address);
        userRepository.save(user);
        return updateAdress;
    }

    @Override
    public int deleteUserAddress(UserDetails userDetails, Address address) {
        UserDAO user = getUser(userDetails);
        Address deleteAddress = getUserAddress(userDetails);
        user.setAddress(null);
        addressRepository.deleteById(deleteAddress.getId());
        userRepository.save(user);
        return deleteAddress.getId();
    }

    private UserDAO getUser(UserDetails userDetails) {
        Optional<UserDAO> result = userRepository.findByEmail(userDetails.getUsername());
        UserDAO user = null;
        if (result.isPresent()) {
            user = result.get();
        } else {
            throw new UserNotFoundException("User id not found!");
        }
        return user;
    }
}
