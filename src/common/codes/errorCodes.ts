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
  PaginationValidationFailed = 8,
}

export enum MeetupErrorCodes {
  MeetupIsNotExist = 9,
  MeetupDtoValidationFailed = 10,
  MeetupCreationFailed = 11,
  MeetupModificationFailed = 12,
  MeetupDeletionFailed = 13,
}

export enum TagErrorCodes {
  TagIsNotExist = 14,
  TagDtoValidationFailed = 15,
  TagCreationFailed = 16,
  TagModificationFailed = 17,
  TagDeletionFailed = 18,
}
