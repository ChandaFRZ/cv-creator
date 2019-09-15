package at.friedrichbachinger.mainappfcb.rest.exceptions;

public class ExperienceNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 8161373902498979405L;

	public ExperienceNotFoundException() {
		super();
	}

	public ExperienceNotFoundException(String message, Throwable cause, boolean enableSuppression,
			boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

	public ExperienceNotFoundException(String message, Throwable cause) {
		super(message, cause);
	}

	public ExperienceNotFoundException(String message) {
		super(message);
	}

	public ExperienceNotFoundException(Throwable cause) {
		super(cause);
	}	
}
