import { AuthErrorCodes } from './errorCodes';
import { AuthErrorMessages } from './errorMessages';

const authErrorCodesMap = {
  [AuthErrorCodes.UserSingupDtoValidationFailed]:
    AuthErrorMessages.UserSingupDtoValidationFailed,
  [AuthErrorCodes.UsernameIsNotUnique]: AuthErrorMessages.UsernameIsNotUnique,
};

export { AuthErrorCodes, authErrorCodesMap };
