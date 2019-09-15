package at.friedrichbachinger.mainappfcb.rest;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import at.friedrichbachinger.mainappfcb.entity.elements.Address;
import at.friedrichbachinger.mainappfcb.service.AddressService;
import at.friedrichbachinger.mainappfcb.service.JwtUserDetailsService;

@RestController
@JsonIgnoreProperties(ignoreUnknown = true)
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api")
public class AddressRestController {

	@Autowired
	private AddressService addressService;

	@Autowired
	private JwtUserDetailsService userDetailsService;

	public AddressRestController() {
	}

	@PreAuthorize("hasRole('USER')")
	@GetMapping("/address")
	public ResponseEntity<Address> getUserAddress(@RequestHeader("Authorization") String bearer) throws Exception {
		UserDetails userDetails = userDetailsService.loadUserByBearer(bearer);
		return ResponseEntity.ok().body(addressService.getUserAddress(userDetails));
	}

	@PostMapping("/address")
	public ResponseEntity<Address> addUserAddress(@RequestHeader("Authorization") String bearer,
			@RequestBody Address address) throws Exception {
		System.out.println(address);
		UserDetails userDetails = userDetailsService.loadUserByBearer(bearer);
		return ResponseEntity.ok().body(addressService.addUserAddress(userDetails, address));
	}

	@PutMapping("/address")
	public ResponseEntity<Address> updateUserAddress(@RequestHeader("Authorization") String bearer,
			@RequestBody Address address) throws Exception {
		UserDetails userDetails = userDetailsService.loadUserByBearer(bearer);
		return ResponseEntity.ok().body(addressService.updateAddress(userDetails, address));
	}

	@DeleteMapping("/address")
	public ResponseEntity<Integer> deleteUserAddress(@RequestHeader("Authorization") String bearer,
			@RequestBody Address address) throws Exception {
		UserDetails userDetails = userDetailsService.loadUserByBearer(bearer);
		return ResponseEntity.ok().body(addressService.deleteUserAddress(userDetails, address));
	}
}