import { AuthErrorCodes } from './errorCodes';
import { AuthErrorMessages } from './errorMessages';

const authErrorCodesMap = {
  [AuthErrorCodes.InvalidUserCredentials]:
    AuthErrorMessages.InvalidUserCredentials,
  [AuthErrorCodes.UsernameIsNotUnique]: AuthErrorMessages.UsernameIsNotUnique,
  [AuthErrorCodes.UserDoesNotExist]: AuthErrorMessages.UserDoesNotExist,
  [AuthErrorCodes.PasswordsDoNotMatch]: AuthErrorMessages.PasswordsDoNotMatch,
};

export { AuthErrorCodes, authErrorCodesMap };
