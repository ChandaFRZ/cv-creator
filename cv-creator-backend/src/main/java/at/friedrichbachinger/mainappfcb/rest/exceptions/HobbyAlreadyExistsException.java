package at.friedrichbachinger.mainappfcb.rest.exceptions;

public class HobbyAlreadyExistsException extends RuntimeException {

	private static final long serialVersionUID = 3799492401251014064L;

	public HobbyAlreadyExistsException() {
		super();
	}

	public HobbyAlreadyExistsException(String message, Throwable cause, boolean enableSuppression,
			boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

	public HobbyAlreadyExistsException(String message, Throwable cause) {
		super(message, cause);
	}

	public HobbyAlreadyExistsException(String message) {
		super(message);
	}

	public HobbyAlreadyExistsException(Throwable cause) {
		super(cause);
	}
}
