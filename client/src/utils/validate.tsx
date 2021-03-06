
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

export const validateImage = (str:string): boolean => {
  const indexOfPeriod = str.indexOf('.');
  const fileType = str.slice(indexOfPeriod+ 1, str.length);
  switch (fileType) {
      case 'png':
      case 'PNG':
          return true;
      case 'jpg':
      case 'JPG':
          return true;
      case 'jpeg': 
      case 'JPEG':
          return true;
      case 'gif':
      case 'GIF':
          return true;
      default:
          return false;      
  }
}