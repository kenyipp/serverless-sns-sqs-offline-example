declare function HttpError(statusCode:number, error:Error): Error;

declare namespace HttpError {

	interface ErrorDetail {
		code: number;
		message: string;
		target: string;
		details: ErrorDetail[];
	}

	function Error(code: number, message: string, target: string, details: ErrorDetail[]): ErrorDetail;

	function createError(statusCode:number, error:Error): Error;

	function use(callback: Function): void;  
	
	function handleError( rawError: Error );

	function BadRequest(code: number, error: ErrorDetail);

	function Unauthorized(code: number, error: ErrorDetail);

	function PaymentRequired(code: number, error: ErrorDetail);

	function Forbidden(code: number, error: ErrorDetail);

	function NotFound(code: number, error: ErrorDetail);
	
	function MethodNotAllowed(code: number, error: ErrorDetail);

	function NotAcceptable(code: number, error: ErrorDetail);

	function InternalServerError(code: number, error: ErrorDetail);

	function NotImplemented(code: number, error: ErrorDetail);

	function ServiceUnavailable(code: number, error: ErrorDetail);

}

export = HttpError;
