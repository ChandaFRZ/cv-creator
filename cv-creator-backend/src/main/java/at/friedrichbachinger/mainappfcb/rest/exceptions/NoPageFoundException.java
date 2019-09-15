package at.friedrichbachinger.mainappfcb.rest.exceptions;

public class NoPageFoundException extends RuntimeException {

	private static final long serialVersionUID = -3505561264069372212L;

	public NoPageFoundException() {
		super();
	}

	public NoPageFoundException(String message, Throwable cause, boolean enableSuppression,
			boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

	public NoPageFoundException(String message, Throwable cause) {
		super(message, cause);
	}

	public NoPageFoundException(String message) {
		super(message);
	}

	public NoPageFoundException(Throwable cause) {
		super(cause);
	}
}
