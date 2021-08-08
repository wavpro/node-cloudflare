export default function (array, id) {
  let endArray = [];
  array.forEach((item) => {
    if (item.id === id) {
      return endArray.push(item);
    } else return;
  });
  return endArray;
}
