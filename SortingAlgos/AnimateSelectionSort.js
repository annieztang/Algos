function animateSelectionSort() {
      let bars = qsa(".bar");
      let k = 1;
      for (let i = 0; i < arr.length - 1; i++) {
         let min_index = i;
         colorBars("red", i, k); // first element in sub-array green.

         for (let j = i + 1; j < arr.length; j++) {
            colorBars("orchid", j, k);
             // shows iterator for 0.5, then turn red

            if (arr[j] < arr[min_index]) { // if min val found, turn BOTH first and min bar RED
               k++;
               colorBars("purple", min_index, k); // turn old min_index back to purple
               colorBars("red", j, k);
               colorBars("red", i, k);
               min_index = j;
            }

            if (min_index == j) {
               colorBars("red", min_index, k);
            }
            k++;
            if (min_index != j) { // if iterator is not min val, turn bar back to purple
               colorBars("purple", j, k);
            }
         }

         setTimeout(swapBars, k * interval, min_index, i);
         let min = arr[min_index];
         arr[min_index] = arr[i];
         arr[i] = min;

         // mark 1st element as sorted, remove all classes from rest
         colorBars("green", i, k); // first element marked as sorted
         colorBars("green", min_index, k); // min_index temporarily marked as sorted.
         k += 1;

         // holds green after swap, then changes second bar to purple
         if (min_index != i) {
            colorBars("purple", min_index, k); // turns the post-swap, min_index back to purple
         }
      }
      colorBars("green", arr.length - 1, k);
}
