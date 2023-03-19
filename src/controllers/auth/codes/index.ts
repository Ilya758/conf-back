import {
  AuthErrorCodes,
  CommonErrorCodes,
  MeetupErrorCodes,
} from './errorCodes';
import {
  AuthErrorMessages,
  CommonErrorMessages,
  MeetupErrorMessages,
} from './errorMessages';

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

const meetupErrorCodesMap = {
  [MeetupErrorCodes.MeetupIsNotExist]: MeetupErrorMessages.MeetupIsNotExist,
  [MeetupErrorCodes.MeetupDtoValidationFailed]:
    MeetupErrorMessages.MeetupDtoValidationFailed,
  [MeetupErrorCodes.MeetupCreationFailed]:
    MeetupErrorMessages.MeetupCreationFailed,
  [MeetupErrorCodes.MeetupUpdateFailed]: MeetupErrorMessages.MeetupUpdateFailed,
};

export {
  AuthErrorCodes,
  CommonErrorCodes,
  MeetupErrorCodes,
  authErrorCodesMap,
  commonErrorCodesMap,
  meetupErrorCodesMap,
};
