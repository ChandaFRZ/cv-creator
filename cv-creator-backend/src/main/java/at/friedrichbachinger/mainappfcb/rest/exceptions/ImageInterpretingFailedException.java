package at.friedrichbachinger.mainappfcb.rest.exceptions;

public class ImageInterpretingFailedException extends RuntimeException {


	private static final long serialVersionUID = -6538156763104299753L;

	public ImageInterpretingFailedException() {
		super();
	}

	public ImageInterpretingFailedException(String message, Throwable cause, boolean enableSuppression,
			boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

	public ImageInterpretingFailedException(String message, Throwable cause) {
		super(message, cause);
	}

	public ImageInterpretingFailedException(String message) {
		super(message);
	}

	public ImageInterpretingFailedException(Throwable cause) {
		super(cause);
	}
}
