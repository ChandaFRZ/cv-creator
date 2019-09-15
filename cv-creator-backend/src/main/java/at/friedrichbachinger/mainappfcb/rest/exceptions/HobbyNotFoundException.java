package at.friedrichbachinger.mainappfcb.rest.exceptions;

public class HobbyNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 8161373902498979405L;

	public HobbyNotFoundException() {
		super();
	}

	public HobbyNotFoundException(String message, Throwable cause, boolean enableSuppression,
			boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

	public HobbyNotFoundException(String message, Throwable cause) {
		super(message, cause);
	}

	public HobbyNotFoundException(String message) {
		super(message);
	}

	public HobbyNotFoundException(Throwable cause) {
		super(cause);
	}
}
