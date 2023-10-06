import { createContext } from 'react';
import { AuthContextTypes } from '../../types/auth-context.types';

export const AuthContext = createContext<AuthContextTypes | null>(null);
