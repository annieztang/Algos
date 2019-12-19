function selectionSort(arr) {
   for (let i = 0; i < arr.length - 1; i++) {
      let min_index = i;                           // set index of min to first element of sub-array.

      // find min element in sub-array
      for (let j = i + 1; j < arr.length; j++) {   // iterate over 2nd element of sub-array to end of array
         if (arr[j] < arr[min_index]) {            // check if current element is smaller than min.
            min_index = j;
         }
      }

      // swap min and first elements
      let min = arr[min_index];                    // placeholder for min value
      arr[min_index] = arr[i];                     // first element into index of min element
      arr[i] = min;                                // min value into first element
   }
}
