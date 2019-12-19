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

   // index cursors
   let i = 0;                          // index cursor for left sub-array
   let j = 0;                          // index cursor for right sub-array

   // fill in left and right sub-arrays (unsorted)
   if (n % 2 == 0) {                   // if array is empty, fill

   } else {

   }
   // recursively split and sort arrays
   // return a merge left and right subarrays
}

// function for split

// function for merge sorted arrays
// create space for result arrays
