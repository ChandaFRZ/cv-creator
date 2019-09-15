package at.friedrichbachinger.mainappfcb.rest.errorHandler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;

import at.friedrichbachinger.mainappfcb.rest.exceptions.ProgressionAlreadyExistsException;
import at.friedrichbachinger.mainappfcb.rest.exceptions.ProgressionNotFoundException;
import at.friedrichbachinger.mainappfcb.rest.response.GlobalErrorResponse;

public class ProgressionBoxRestExceptionHandler {
	
	@ExceptionHandler
	public ResponseEntity<GlobalErrorResponse> handleException(ProgressionAlreadyExistsException exc) {

		GlobalErrorResponse error = new GlobalErrorResponse(HttpStatus.BAD_REQUEST.value(), exc.getMessage(),
				System.currentTimeMillis());
		return new ResponseEntity<GlobalErrorResponse>(error, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler
	public ResponseEntity<GlobalErrorResponse> handleException(ProgressionNotFoundException exc) {

		GlobalErrorResponse error = new GlobalErrorResponse(HttpStatus.BAD_REQUEST.value(), exc.getMessage(),
				System.currentTimeMillis());
		return new ResponseEntity<GlobalErrorResponse>(error, HttpStatus.BAD_REQUEST);
	}
}
