function insertionSort(arr) {

   // insertion sort
   for (let i = 1; i < arr.length; i++) {             // for loop to run through loops n times
      if(arr[i] < arr[i - 1]) {
         let j = i;                                   // index cursor starting at i
         while(arr[j] < arr[j - 1] && j > 0) {        // if jth element is less than previous and j
            let placeholder = arr[j];                 // placeholder for jth value
            arr[j] = arr[j - 1];
            arr[j - 1] = placeholder;
            j--;                                      // move left in the array
         }
      }
   }

   return arr;
}
