package at.friedrichbachinger.mainappfcb.rest.errorHandler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;

import at.friedrichbachinger.mainappfcb.rest.exceptions.AddressNotFoundException;
import at.friedrichbachinger.mainappfcb.rest.response.GlobalErrorResponse;

public class AddressBoxRestExceptionHandler {

	@ExceptionHandler
	public ResponseEntity<GlobalErrorResponse> handleException(AddressNotFoundException exc) {

		GlobalErrorResponse error = new GlobalErrorResponse(HttpStatus.OK.value(), exc.getMessage(),
				System.currentTimeMillis());
		return new ResponseEntity<GlobalErrorResponse>(error, HttpStatus.OK);
	}
}
