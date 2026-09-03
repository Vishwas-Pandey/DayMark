import { getRequestId } from '../context/requestContext.js';

export class ApiResponse {
  constructor(statusCode, data, message = 'Success', pagination = null) {
    this.success = statusCode < 400;
    this.message = message;
    this.data = data;
    this.meta = {
      requestId: getRequestId(),
      timestamp: new Date().toISOString(),
      pagination
    };
    this.errors = null;
  }
}
