export const validatePhone = (value) => {
  const tenDigitsPattern = /^[0-9]{10}$/;
  const allowNumbersOnlyPattern = /^[0-9]*$/;

  if (!value) {
    return "Phone number is required";
  } else if (!allowNumbersOnlyPattern.test(value)) {
    return "Enter numbers only";
  } else if (!tenDigitsPattern.test(value)) {
    return "Please enter 10 digits only";
  }
  return "";
};
