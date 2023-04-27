type Lookup = { [key: string]: string };

export const FIREBASE_ERRORS: Lookup = {
  'Firebase: Error (auth/email-already-in-use).': 'Email already in use',
  'Firebase: Error (auth/invalid-email).': 'Invalid email',
  'Firebase: Error (auth/user-not-found).': 'User not found',
  'Firebase: Error (auth/wrong-password).': 'Wrong password',
  'Firebase: Error (auth/weak-password).': 'Weak password',
  'Firebase: Error (auth/invalid-verification-code).':
    'Invalid verification code',
  'Firebase: Error (auth/invalid-verification-id).': 'Invalid verification id',
  'Firebase: Error (auth/code-expired).': 'Code expired',
  'Firebase: Error (auth/invalid-credential).': 'Invalid credential',
};
