// Custom error codes formats
// The error codes are formatted as follows:
// PREFIX: The prefix of the error code. e.g. USER_, PASSWORD_
// TYPE: The type of the error code. e.g. USER_NOT_FOUND, PASSWORD_TOO_SHORT
// The error codes are defined in the following format:
// This file comes with some generic error codes that can be used in the application

export const CLIENT_ERRORS = {
  BODY_EMPTY: 'BODY_EMPTY',
  BODY_INVALID: 'BODY_INVALID',
  PARAMS_EMPTY: 'PARAMS_EMPTY',
  PARAMS_INVALID: 'PARAMS_INVALID',
  QUERY_EMPTY: 'QUERY_EMPTY',
  QUERY_INVALID: 'QUERY_INVALID',
  HEADER_EMPTY: 'HEADER_EMPTY',
  HEADER_INVALID: 'HEADER_INVALID',
} as const;

export const SERVER_ERRORS = {
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
} as const;

export type ClientError =
  | (typeof CLIENT_ERRORS)[keyof typeof CLIENT_ERRORS]
  | 'UNKNOWN_ERROR';

export type ServerError =
  | (typeof SERVER_ERRORS)[keyof typeof SERVER_ERRORS]
  | 'UNKNOWN_ERROR';
