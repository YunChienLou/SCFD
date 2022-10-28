export const dateFormate = (time) => {
  let timeArray = time.split("");
  let answer;
  let index = time.indexOf("T");
  timeArray.splice(index, 1, " ");
  answer = timeArray.join("");
  return answer;
};
