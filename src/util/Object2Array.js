export const Object2Array = (object) => {
  let array = [];
  for (const key in object) {
    let obj = { type: key, Num: object[key] };
    array.push(obj);
  }

  array.sort(function (a, b) {
    return b.Num - a.Num;
  });
  console.log(array);
  return array;
};
