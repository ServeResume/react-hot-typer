export const getCommonText = (str1, str2) => {
  const minLength = Math.min(str1.length, str2.length);
  let commonText = '';

  for (let i = 0; i < minLength; i++) {
    if (str1[i] === str2[i]) {
      commonText = commonText + str1[i];
    } else {
      return commonText;
    }
  }
  return commonText;
};
