export interface SignUp {
  username?: string
  password?: string
  confirmPassword?: string
  role?: 'FULL_ACCESS' | 'READ'
};

export interface SignUpError {
  username: string
  password: string
  confirmPassword: string
}

export type RoleType = 'FULL_ACCESS' | 'READ'
