package at.friedrichbachinger.mainappfcb.rest.errorHandler;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import at.friedrichbachinger.mainappfcb.rest.exceptions.ErrorDetails;
import at.friedrichbachinger.mainappfcb.rest.exceptions.ResourceNotFoundException;
import at.friedrichbachinger.mainappfcb.rest.response.GlobalErrorResponse;

@ControllerAdvice
public class GlobalExceptionHandler implements Serializable {

	private static final long serialVersionUID = -5155939313228901530L;

	@ExceptionHandler({ ConstraintViolationException.class })
	public ResponseEntity<GlobalErrorResponse> constrainViloationException(ConstraintViolationException e) {
		List<String> messages = new ArrayList<String>();
		Set<ConstraintViolation<?>> constraintViolations = e.getConstraintViolations();
		for (ConstraintViolation<?> constraintViolation : constraintViolations) {
			messages.add(constraintViolation.getMessage());
		}

		GlobalErrorResponse error = new GlobalErrorResponse(HttpStatus.BAD_REQUEST.value(), messages.toString(),
				System.currentTimeMillis());

		return new ResponseEntity<GlobalErrorResponse>(error, HttpStatus.BAD_GATEWAY);
	}

	@ExceptionHandler({ MaxUploadSizeExceededException.class })
	public ResponseEntity<GlobalErrorResponse> maxUploadSizeExceededExeption(MaxUploadSizeExceededException e,
			RedirectAttributes redirectAttributes) {

		GlobalErrorResponse error = new GlobalErrorResponse(HttpStatus.FORBIDDEN.value(), e.getMessage(),
				System.currentTimeMillis());

		return new ResponseEntity<GlobalErrorResponse>(error, HttpStatus.FORBIDDEN);
	}

	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<?> resourceNotFoundException(ResourceNotFoundException ex, WebRequest request) {
		ErrorDetails errorDetails = new ErrorDetails(new Date(), ex.getMessage(), request.getDescription(false));
		return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
	}

}
