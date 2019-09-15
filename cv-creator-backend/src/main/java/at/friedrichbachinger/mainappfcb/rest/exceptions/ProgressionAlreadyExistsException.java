package at.friedrichbachinger.mainappfcb.rest.exceptions;

public class ProgressionAlreadyExistsException extends RuntimeException {

	private static final long serialVersionUID = 3799492401251014064L;

	public ProgressionAlreadyExistsException() {
		super();
	}

	public ProgressionAlreadyExistsException(String message, Throwable cause, boolean enableSuppression,
			boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

	public ProgressionAlreadyExistsException(String message, Throwable cause) {
		super(message, cause);
	}

	public ProgressionAlreadyExistsException(String message) {
		super(message);
	}

	public ProgressionAlreadyExistsException(Throwable cause) {
		super(cause);
	}
}
