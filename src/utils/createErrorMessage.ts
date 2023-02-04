type TErrorMessageConfig = {
  (code: number, errorCodesMap: Record<number, string>): string;
  (code: number, message: string): string;
};

export const createErrorMessage: TErrorMessageConfig = (
  code,
  errorCodesMapOrMessage
): string => {
  const message =
    typeof errorCodesMapOrMessage === 'string'
      ? errorCodesMapOrMessage
      : errorCodesMapOrMessage[code] ?? '';

  return `${code} - ${message}`;
};
