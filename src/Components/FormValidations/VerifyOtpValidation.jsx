export const VerifyOtpValidation = (value) => {
  const sixDigitsPattern = /^\d{6}$/;

  if (!value) {
    return "OTP is required";
  } else if (!/^\d+$/.test(value)) {
    return "Enter numbers only";
  } else if (!sixDigitsPattern.test(value)) {
    return "Enter exactly 6 digits for OTP";
  }
  return "";
};
