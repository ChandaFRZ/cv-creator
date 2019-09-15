package at.friedrichbachinger.mainappfcb.rest.exceptions;

public class KnowledgeNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 8161373902498979405L;

	public KnowledgeNotFoundException() {
		super();
	}

	public KnowledgeNotFoundException(String message, Throwable cause, boolean enableSuppression,
			boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

	public KnowledgeNotFoundException(String message, Throwable cause) {
		super(message, cause);
	}

	public KnowledgeNotFoundException(String message) {
		super(message);
	}

	public KnowledgeNotFoundException(Throwable cause) {
		super(cause);
	}
}
