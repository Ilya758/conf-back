export enum AuthErrorCodes {
  InvalidUserCredentials = 1,
  UsernameIsNotUnique = 2,
  UserDoesNotExist = 3,
  PasswordsDoNotMatch = 4,
  AuthenticationTokenIsMissing = 5,
  WrongAuthenticationToken = 6,
}

export enum CommonErrorCodes {
  PrimaryKeyValidationFailed = 7,
}

export enum MeetupErrorCodes {
  MeetupIsNotExist = 8,
  MeetupDtoValidationFailed = 9,
  MeetupCreationFailed = 10,
  MeetupUpdateFailed = 11,
}

export enum TagErrorCodes {
  TagIsNotExist = 12,
}
