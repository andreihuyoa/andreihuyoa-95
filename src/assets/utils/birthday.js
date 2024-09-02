export const calculateAge = (birthDate) => {
  const today = new Date();
  const birthYear = birthDate.getFullYear();
  const birthMonth = birthDate.getMonth();
  const birthDay = birthDate.getDate();

  let age = today.getFullYear() - birthYear;

  const isBirthdayPassed =
    today.getMonth() > birthMonth ||
    (today.getMonth() === birthMonth && today.getDate() >= birthDay);

  if (!isBirthdayPassed) {
    age--;
  }

  return age;
};
