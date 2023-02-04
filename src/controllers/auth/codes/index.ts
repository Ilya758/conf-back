import { AuthErrorCodes } from './errorCodes';
import { AuthErrorMessages } from './errorMessages';

const authErrorCodesMap = {
  [AuthErrorCodes.UserSingupDtoValidationFailed]:
    AuthErrorMessages.UserSingupDtoValidationFailed,
  [AuthErrorCodes.UsernameIsNotUnique]: AuthErrorMessages.UsernameIsNotUnique,
  [AuthErrorCodes.UserDoesNotExist]: AuthErrorMessages.UserDoesNotExist,
  [AuthErrorCodes.PasswordsDoNotMatch]: AuthErrorMessages.PasswordsDoNotMatch,
};

export { AuthErrorCodes, authErrorCodesMap };
