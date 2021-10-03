class CustomErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }

  static alreadyExists(message) {
    return new CustomErrorHandler(409, message);
  }

  static wrongCredentials(message) {
    return new CustomErrorHandler(401, message);
  }

  static unAuthorized(message) {
    return new CustomErrorHandler(401, message);
  }
  static notFound(message) {
    return new CustomErrorHandler(404, message);
  }
  static serverError(message) {
    return new CustomErrorHandler(404, message);
  }

}

export default CustomErrorHandler;
