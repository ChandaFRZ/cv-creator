package at.friedrichbachinger.mainappfcb.rest.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class GlobalErrorResponse {

	private int status;
	private String message;
	private long timeStamp;

	public GlobalErrorResponse(int status, String message, long timeStamp) {
		super();
		this.status = status;
		this.message = message;
		this.timeStamp = timeStamp;
	}

	@Override
	public String toString() {
		return "CustomerErrorResponse [status=" + status + ", message=" + message + ", timeStamp=" + timeStamp + "]";
	}
}
