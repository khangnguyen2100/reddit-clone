import type { User } from 'firebase/auth';

const getUserDisplayName = (user: User) => {
  if (!user) return null;
  if (user.displayName) return user.displayName;
  if (user.email) return user.email.split('@')[0];
  return null;
};
export default getUserDisplayName;
