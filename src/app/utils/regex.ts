export const regex = {
  latinAndNumbersAndSpaces: /^[A-Za-z0-9\s]+$/,
};

export const regexErrors: Record<keyof typeof regex, string> = {
  latinAndNumbersAndSpaces:
    'Only Latin letters, digits, and spaces are allowed',
};
