package at.friedrichbachinger.mainappfcb.rest.errorHandler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;

import at.friedrichbachinger.mainappfcb.rest.exceptions.EmailExistsException;
import at.friedrichbachinger.mainappfcb.rest.exceptions.UserNotFoundException;
import at.friedrichbachinger.mainappfcb.rest.response.GlobalErrorResponse;

public class UserRestExceptionHandler {
	@ExceptionHandler
	public ResponseEntity<GlobalErrorResponse> handleException(UserNotFoundException exc) {

		GlobalErrorResponse error = new GlobalErrorResponse(HttpStatus.NOT_FOUND.value(), exc.getMessage(),
				System.currentTimeMillis());
		return new ResponseEntity<GlobalErrorResponse>(error, HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler
	public ResponseEntity<GlobalErrorResponse> handleException(EmailExistsException exc) {

		GlobalErrorResponse error = new GlobalErrorResponse(HttpStatus.BAD_REQUEST.value(), exc.getMessage(),
				System.currentTimeMillis());
		return new ResponseEntity<GlobalErrorResponse>(error, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler
	public ResponseEntity<GlobalErrorResponse> handleException(Exception exc) {

		GlobalErrorResponse error = new GlobalErrorResponse(HttpStatus.BAD_REQUEST.value(), exc.getMessage(),
				System.currentTimeMillis());
		return new ResponseEntity<GlobalErrorResponse>(error, HttpStatus.BAD_REQUEST);
	}
}
