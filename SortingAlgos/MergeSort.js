function mergeSort(arr) {
   let n = arr.length                  // length of input array
   let left[];                         // left sub-array
   let right[];                        // right sub-array

   // create space for left and right sub-arrays
   if (n == 0) {                       // if array is empty, return empty array
      return arr;
   } else if (n % 2 == 0) {            // if array length is even, sub-arrays are half of length
      left = new int[n / 2];
      right = new int[n / 2];
   } else {                            // if array length is odd, right array is 1 bigger than left
      left = new int[n / 2];
      right = new int[n / 2 + 1];
   }


   // fill in left and right sub-arrays (unsorted)
   for (let i = 0; i < n; i++) {
      if (i < n / 2) {                 // fill left sub-array til mid-point of input array
         left[i] = arr[i];
      } else {                         // fill right sub-array til end of input array
         right[i - n / 2] = arr[i];
      }
   }
   // recursively split and sort arrays
   // return a merge left and right subarrays
}

// function for split

// function for merge sorted arrays
// create space for result arrays
