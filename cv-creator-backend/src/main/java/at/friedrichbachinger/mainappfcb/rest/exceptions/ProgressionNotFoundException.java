package at.friedrichbachinger.mainappfcb.rest.exceptions;

public class ProgressionNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 8161373902498979405L;

	public ProgressionNotFoundException() {
		super();
	}

	public ProgressionNotFoundException(String message, Throwable cause, boolean enableSuppression,
			boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

	public ProgressionNotFoundException(String message, Throwable cause) {
		super(message, cause);
	}

	public ProgressionNotFoundException(String message) {
		super(message);
	}

	public ProgressionNotFoundException(Throwable cause) {
		super(cause);
	}
}
