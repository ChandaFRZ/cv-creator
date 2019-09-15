package at.friedrichbachinger.mainappfcb.rest.exceptions;

public class EmailExistsException extends RuntimeException {

	private static final long serialVersionUID = 6837947619949316239L;

	public EmailExistsException() {
		super();
	}

	public EmailExistsException(String message, Throwable cause, boolean enableSuppression,
			boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

	public EmailExistsException(String message, Throwable cause) {
		super(message, cause);
	}

	public EmailExistsException(String message) {
		super(message);
	}

	public EmailExistsException(Throwable cause) {
		super(cause);
	}
}
