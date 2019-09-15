package at.friedrichbachinger.mainappfcb.rest.response;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

public class GeneralResponse {

	private HttpHeaders headers = new HttpHeaders();
	private String message = "";
	private HttpStatus httpStatus;

	public GeneralResponse() {
		headers.add("Content-Type", "application/json");
	}

	public GeneralResponse(String message, HttpStatus httpStatus) {
		this.message = message;
		this.httpStatus = httpStatus;
		headers.add("Content-Type", "application/json");
	}

	public HttpHeaders getHeaders() {
		return headers;
	}

	public void setHeaders(HttpHeaders headers) {
		this.headers = headers;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public HttpStatus getHttpStatus() {
		return httpStatus;
	}

	public void setHttpStatus(HttpStatus httpStatus) {
		this.httpStatus = httpStatus;
	}

	public GeneralResponse createResponse() {
		return this;
	}
}
