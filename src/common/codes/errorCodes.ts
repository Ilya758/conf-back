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
  MeetupModificationFailed = 11,
  MeetupDeletionFailed = 12,
}

export enum TagErrorCodes {
  TagIsNotExist = 13,
  TagDtoValidationFailed = 14,
  TagCreationFailed = 15,
  TagModificationFailed = 15,
  TagDeletionFailed = 16,
}
