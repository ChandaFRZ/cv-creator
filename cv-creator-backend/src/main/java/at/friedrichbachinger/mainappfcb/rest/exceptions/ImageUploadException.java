package at.friedrichbachinger.mainappfcb.rest.exceptions;

public class ImageUploadException extends RuntimeException {

	private static final long serialVersionUID = 6221906833758692693L;

	public ImageUploadException() {
		super();
	}

	public ImageUploadException(String message, Throwable cause, boolean enableSuppression,
			boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

	public ImageUploadException(String message, Throwable cause) {
		super(message, cause);
	}

	public ImageUploadException(String message) {
		super(message);
	}

	public ImageUploadException(Throwable cause) {
		super(cause);
	}
}
