const lookup = {};

const arrays = [
  [0, 1, 2, 3, 4, 4, 4, 4],
  [5, 6, 7, 8, 9, 10, 11, 11],
  [2, 7, 10, 12],
  [0, 7, 10, 14]
];

const reduced = arrays.map((array, index) => {
  for(let i=array.length-1; i>=0; i--) {
    let value = array[i];
    let knownIndex = (lookup[value] = lookup[value] ?? index);
    if (knownIndex < index) {
      array.splice(i,1);
    }
  }
  return array;
});

console.log(reduced);
