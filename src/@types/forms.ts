interface LogInForm {
  email: string;
  password: string;
}

interface SignUpForm {
  email: string;
  username: string;
  password: string;
  passwordRepeat: string;
}

export type { LogInForm, SignUpForm };
