export const chunkArray = (myArray, chunk_size) => {
  let index = 0;
  const arrayLength = myArray.length;
  var tempArray = [];

  for (index = 0; index < arrayLength; index += chunk_size) {
    let chunk = [];
    chunk = myArray.slice(index, index + chunk_size);
    tempArray.push(chunk);
  }

  return tempArray;
}
