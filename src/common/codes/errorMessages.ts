export enum AuthErrorMessages {
  InvalidUserCredentials = 'User signup validation failed',
  UsernameIsNotUnique = 'The same username already exists',
  UserDoesNotExist = "The user doesnt't exist",
  PasswordsDoNotMatch = "Be sure you've entered a correct password",
  AuthenticationTokenIsMissing = 'Authentication token is missing',
  WrongAuthenticationToken = 'Auth token is expired/invalid or has been corrupted',
}

export enum CommonErrorMessages {
  PrimaryKeyValidationFailed = 'Primary key validation failed',
  PaginationValidationFailed = 'Pagination validation failed',
}

export enum MeetupErrorMessages {
  MeetupIsNotExist = "Meetup isn't exist",
  MeetupDtoValidationFailed = 'Meetup DTO validation failed',
  MeetupCreationFailed = 'Meetup creation failed',
  MeetupModificationFailed = 'Meetup modification failed',
  MeetupDeletionFailed = 'Meetup deletion failed',
}

export enum TagErrorMessages {
  TagIsNotExist = "Tag isn't exist",
  TagDtoValidationFailed = 'Tag DTO validation failed',
  TagCreationFailed = 'Tag creation failed',
  TagModificationFailed = 'Tag modification failed',
  TagDeletionFailed = 'Tag deletion failed',
}
