
export const validateEmail = (email: string):string => {
  if (!email.trim().match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
    return "Not a Valid Email";
  }
  return ""
}

export const validateConfirmPassword = (password: string, confirmPassword: string): string => {
  if(password.trim() !== confirmPassword.trim()) {
    return "Passwords do not match. Check your typing.";
  }
  return "";
}