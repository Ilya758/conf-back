export enum AuthErrorMessages {
  InvalidUserCredentials = 'User signup validation failed',
  UsernameIsNotUnique = 'The same username already exists',
  UserDoesNotExist = "The user doesnt't exist",
  PasswordsDoNotMatch = "Be sure you've entered a correct password",
  AuthenticationTokenIsMissing = 'Authentication token is missing',
  WrongAuthenticationToken = 'Auth token is expired/invalid or has been corrupted',
}
