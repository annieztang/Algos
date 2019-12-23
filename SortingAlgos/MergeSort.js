function mergeSort(arr) {
   let n = arr.length;                  // length of input array
   let left = [];                         // left sub-array
   let right = [];                       // right sub-array

   // create space for left and right sub-arrays
   if (n == 1) {                       // if array is size 1, return it (size 1 is sorted)
      return arr;
   }



   // fill in left and right sub-arrays (unsorted)
   for (let i = 0; i < n; i++) {
      if (i < Math.floor(n / 2)) {                 // fill left sub-array til mid-point of input array
         left[i] = arr[i];
      } else {                         // fill right sub-array til end of input array
         right[i - Math.floor(n / 2)] = arr[i];
      }
   }

   // recursively split and sort arrays
   left = mergeSort(left);
   right = mergeSort(right);

   // return a merge left and right subarrays
   return merge(left, right);
}

// function for merging sorted arrays
function merge(left, right) {

   // create space for result array
   let result = [];

   // index cursors
   let i = 0;                          // left array cursor
   let j = 0;                          // right array cursor
   let index = 0;                      // result array cursor

   // fill result array with sub-arrays until one sub-array is depleted
   while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
         result[index] = left[i];
         i++;
      } else {
         result[index] = right[j];
         j++;
      }
      index++;
   }

   // fill result array with rest of left sub-array if elements still unadded
   while (i < left.length) {
      result[index] = left[i];
      i++;
      index++;
   }

   // fil result array with rest of right sub-array if elemnts still unadded
   while (j < right.length) {
      result[index] = right[j];
      j++;
      index++;
   }

   return result;
}
