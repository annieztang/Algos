function bubbleSort(arr) {
   if(arr.length > 1) {
      let isSorted;
      do {
         isSorted = true;
         for (let i = 0; i < arr.length - 1; i++) {
            if(arr[i] > arr[i+1]) {
               let placeholder = arr[i];
               arr[i] = arr[i+1];
               arr[i+1] = placeholder;
               isSorted = false;
            }
         }
      } while (!isSorted);
   }
}
