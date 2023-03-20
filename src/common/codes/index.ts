import {
  AuthErrorCodes,
  CommonErrorCodes,
  MeetupErrorCodes,
  TagErrorCodes,
} from './errorCodes';
import {
  AuthErrorMessages,
  CommonErrorMessages,
  MeetupErrorMessages,
  TagErrorMessages,
} from './errorMessages';

const authErrorCodesMap = {
  [AuthErrorCodes.InvalidUserCredentials]:
    AuthErrorMessages.InvalidUserCredentials,
  [AuthErrorCodes.UsernameIsNotUnique]: AuthErrorMessages.UsernameIsNotUnique,
  [AuthErrorCodes.UserDoesNotExist]: AuthErrorMessages.UserDoesNotExist,
  [AuthErrorCodes.PasswordsDoNotMatch]: AuthErrorMessages.PasswordsDoNotMatch,
  [AuthErrorCodes.AuthenticationTokenIsMissing]:
    AuthErrorMessages.AuthenticationTokenIsMissing,
  [AuthErrorCodes.WrongAuthenticationToken]:
    AuthErrorMessages.WrongAuthenticationToken,
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
  [MeetupErrorCodes.MeetupModificationFailed]:
    MeetupErrorMessages.MeetupModificationFailed,
  [MeetupErrorCodes.MeetupDeletionFailed]:
    MeetupErrorMessages.MeetupDeletionFailed,
};

const tagErrorCodesMap = {
  [TagErrorCodes.TagIsNotExist]: TagErrorMessages.TagIsNotExist,
  [TagErrorCodes.TagDtoValidationFailed]:
    TagErrorMessages.TagDtoValidationFailed,
  [TagErrorCodes.TagCreationFailed]: TagErrorMessages.TagCreationFailed,
  [TagErrorCodes.TagModificationFailed]: TagErrorMessages.TagModificationFailed,
};

export {
  AuthErrorCodes,
  CommonErrorCodes,
  MeetupErrorCodes,
  TagErrorCodes,
  authErrorCodesMap,
  commonErrorCodesMap,
  meetupErrorCodesMap,
  tagErrorCodesMap,
};
