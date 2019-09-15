package at.friedrichbachinger.mainappfcb.rest.exceptions;

public class ExerperienceAlreadyExistsException extends RuntimeException {

	private static final long serialVersionUID = 3799492401251014064L;

	public ExerperienceAlreadyExistsException() {
		super();
	}

	public ExerperienceAlreadyExistsException(String message, Throwable cause, boolean enableSuppression,
			boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

	public ExerperienceAlreadyExistsException(String message, Throwable cause) {
		super(message, cause);
	}

	public ExerperienceAlreadyExistsException(String message) {
		super(message);
	}

	public ExerperienceAlreadyExistsException(Throwable cause) {
		super(cause);
	}
}
