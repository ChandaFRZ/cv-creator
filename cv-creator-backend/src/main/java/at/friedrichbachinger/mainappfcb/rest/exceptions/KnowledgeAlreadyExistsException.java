package at.friedrichbachinger.mainappfcb.rest.exceptions;

public class KnowledgeAlreadyExistsException extends RuntimeException {

	private static final long serialVersionUID = 3799492401251014064L;

	public KnowledgeAlreadyExistsException() {
		super();
	}

	public KnowledgeAlreadyExistsException(String message, Throwable cause, boolean enableSuppression,
			boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

	public KnowledgeAlreadyExistsException(String message, Throwable cause) {
		super(message, cause);
	}

	public KnowledgeAlreadyExistsException(String message) {
		super(message);
	}

	public KnowledgeAlreadyExistsException(Throwable cause) {
		super(cause);
	}
}
