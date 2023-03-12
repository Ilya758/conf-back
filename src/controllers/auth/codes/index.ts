import { AuthErrorCodes, CommonErrorCodes } from './errorCodes';
import { AuthErrorMessages, CommonErrorMessages } from './errorMessages';

const authErrorCodesMap = {
  [AuthErrorCodes.InvalidUserCredentials]:
    AuthErrorMessages.InvalidUserCredentials,
  [AuthErrorCodes.UsernameIsNotUnique]: AuthErrorMessages.UsernameIsNotUnique,
  [AuthErrorCodes.UserDoesNotExist]: AuthErrorMessages.UserDoesNotExist,
  [AuthErrorCodes.PasswordsDoNotMatch]: AuthErrorMessages.PasswordsDoNotMatch,
};

const commonErrorCodesMap = {
  [CommonErrorCodes.PrimaryKeyValidationFailed]:
    CommonErrorMessages.PrimaryKeyValidationFailed,
};

export {
  AuthErrorCodes,
  CommonErrorCodes,
  authErrorCodesMap,
  commonErrorCodesMap,
};
