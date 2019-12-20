function insertionSort(arr) {

   // insertion sort
   for (let i = 0; i < arr.length; i++) {             // for loop to run through loops n times
      for (let j = i + 1; j < arr.length; j++) {          // for loop to iterate over array
         if (arr[j] <= arr[i]) {                       // placeholder to hold jth value
            let plc = arr[j];
            for (let k = j; k > i; k--) {             // for loop to pull vars in reverse
               arr[k] = arr[k - 1];                   // the swap
            }
            arr[i] = plc;                             // extra swap
         }
      }
   }

   return arr;
}
