interface ReturnData {
  message: string;
  error: boolean;
}

export class Validation {
  static email(value: string): ReturnData {
    // if the field is not a valid email
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!regex.test(value)) {
      return { message: "This field must be a valid email", error: true };
    }
    return {
      message: "",
      error: false,
    };
  }

  static password(value: string): ReturnData {
    const regex = /^[a-zA-Z0-9\s]{6,16}$/;
    if (!regex.test(value)) {
      return { message: "This field must be a valid password", error: true };
    }
    return {
      message: "",
      error: false,
    };
  }

  static username(value: string): ReturnData {
    const regex = /^[a-z0-9_-]{3,16}$/;
    if (!regex.test(value)) {
      return { message: "This field must be a valid username", error: true };
    }
    return {
      message: "",
      error: false,
    };
  }

  static isEmpty(value: string): boolean {
    if (!value) {
      return true;
    } else return false;
  }
}
