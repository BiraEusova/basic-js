const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
function transform( arr ) {
  if (!Array.isArray(arr)) {
    throw new Error("'arr' parameter must be an instance of the Array!");
  }

  let result = [];
  let i = 0;

  while (i < arr.length) {
    let current = arr[i];
    if (current === '--double-next') {
      if (i + 1 < arr.length) {
        result.push(arr[i + 1]);
      }
      i++;
    } else if (current === '--discard-prev') {
      if (i - 1 >= 0 && arr[i - 1] !== '--double-next' && arr[i - 1] !== '--discard-prev') {
        result.pop();
      }
      i++;
    } else if (current === '--double-prev') {
      if (i - 1 >= 0 && arr[i - 1] !== '--double-next' && arr[i - 1] !== '--discard-prev') {
        result.push(arr[i - 1]);
      }
      i++;
    } else if (current === '--discard-next') {
      if (i + 1 < arr.length) {
        i += 2;
        continue;
      }
      i++;
    } else {
      result.push(current);
      i++;
    }
  }

  return result;
}

module.exports = {
  transform
};
