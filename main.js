(function() {
   "use strict";                                      // prevents use of undeclared variables
   let arr = [];
   let arr3 = [];
   let arr2 = [];
   let currentSort;
   let interval = 30;
   const maxArraySize = 45;
   const maxArrayValue = 45;
   window.addEventListener("load", init);             // after window loads, run init

   function init() {
      makeNewBars();
      id("start-sort").addEventListener("click", chooseSort);
      id("reset").addEventListener("click", resetSort);
      id("slider").oninput = function() {
         id("slider-value").innerText = this.value;
         // if (id("slider").value <= 10) {
         //    interval = 750;
         // } else if (id("slider").value < 25) {
         //    interval = 100;
         // } else {
         //    currentSort = id("sortingOptions").value;
         //    if (currentSort === "merge"){
         //       interval = 50;
         //    } else {
         //       interval = 5;
         //    }
         // }
         makeNewBars();
      }
      id("speed-slider").oninput = function() {
         if (this.value == 1) {
            id("speed").innerText = "Slow";
            interval = 500;
         } else if (this.value == 2) {
            id("speed").innerText = "Medium";
            interval = 250;
         } else {
            id("speed").innerText = "Fast";
            interval = 30;
         }
      }
   }

   // Selects the animation for the bars
   function chooseSort() {
      currentSort = id("sortingOptions").value;
      if (currentSort == "selection") {
         animateSelectionSort(arr);
      } else if (currentSort == "bubble") {
         animateBubbleSort(arr);
      } else {
         animateMergeSort(arr, 1, 0);
      }
   }

   // resets bar positions and color
   function resetSort() {
      let bars = qsa(".bar");
      arr = arr2.slice();
      setBarHeights(arr);
      for (let i = 0; i < bars.length; i++) {
         bars[i].style.backgroundColor = "purple";
      }
   }

   // animates sorting algorithm
   function animateSelectionSort(arr) {
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

   // function colorBar(bar_index, color) {
   //    bars[bar_index].style.backgroundColor = color;
   // }

   function animateBubbleSort(arr) {
      if (arr.length > 1) {
         let isSorted;
         let j = arr.length - 1;    // counter for green at end
         let k = 1;        // counter for color
         do {
            isSorted = true;
            for (let i = 0; i < j; i++) {
               colorBars("red", i, k);
               colorBars("red", i + 1, k);
               k += 0.5;
               if (arr[i] > arr[i + 1]) {
                  setTimeout(swapBars, k * interval, i, i + 1);
                  colorBars("green", i, k);
                  colorBars("green", i + 1, k);
                  let placeholder = arr[i];
                  arr[i] = arr[i+1];
                  arr[i+1] = placeholder;
                  isSorted = false;
               }
               k += 0.5;
               colorBars("purple", i, k);
            }
            colorBars("green", j, k);
            j--;
         } while (!isSorted);

         for (let i = 0; i < arr.length - 1; i++) {
            colorBars("green", i, k);
         }
      }
   }

   function animateMergeSort(arr, k, start) {
      let n = arr.length;              // length of input array
      let left = [];                   // left sub-array
      let right = [];                  // right sub-array

      // create space for left and right sub-arrays
      if (n == 1) {     // if array is size 1, return it (size 1 is sorted)
         return arr;
      }

      // fill in left and right sub-arrays (unsorted)
      for (let i = 0; i < n; i++) {
         if (i < Math.floor(n / 2)) {                 // fill left sub-array til mid-point of input array
            left[i] = arr[i];
         } else {                                     // fill right sub-array til end of input array
            right[i - Math.floor(n / 2)] = arr[i];
         }
      }

      // recursively split and sort arrays
      left = animateMergeSort(left, k, start);
      if (left.length > 1) {
         k = left[left.length - 1];
         left = left.slice(0, left.length - 1);
      }

      right = animateMergeSort(right, k, start + left.length);
      if (right.length > 1) {
         k = right[right.length - 1];
         right = right.slice(0, right.length - 1);
      }


      // Animation specific interval update. Not applicable for normal merge sort.
      // helper funcion used to animate bar swaps.
      //    returns: number of intervals that have passed.
      k = helperMerge(left, right, k, start);

      // return a merge of left and right subarrays (k is added as a last element to the merge. Need k for animation)
      return merge(left, right, k);
   }

   // function for merging sorted arrays
      function merge(left, right, k) {

         // create space for result array
         let result = [];

         // index cursors
         let i = 0;        // left array cursor
         let j = 0;        // right array cursor
         let index = 0;    // result array cursor

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
         result.push(k);   // add k to end of array
         return result;
      }

      // animates merge sort
      // copy and pasted most of merge...
      //    returns: number of intervals, k, in animation
      function helperMerge(left, right, k, start) {
         // create space for result array
         let result = [];

         // index cursors
         let i = 0;        // left array cursor
         let j = 0;        // right array cursor
         let index = 0;    // result array cursor

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

         let arr_index = start;

         for (let a = 0; a < result.length; a++) {
            colorBars("orchid", arr_index, k);
            arr_index++;
            k++;
         }

         arr_index = start;

         for (let a = 0; a < result.length; a++) {
            setTimeout(printBars, k * interval, result, a, arr_index);
            colorBars("green", arr_index, k);
            k++;
            arr_index++;
         }

         arr_index = start;

         for (let a = 0; a < result.length; a++) {
            colorBars("purple", arr_index, k);
            arr_index++;
         }
         return k;
      }

   function colorBars(color, index, k) {
      let bars = qsa(".bar");
      setTimeout(function() {
         bars[index].style.backgroundColor = color;
      }, k * interval);
   }

   // visually swaps bars
   function swapBars(a_index, b_index) {
      let bars = qsa(".bar");
      let min = bars[a_index].style.height;
      bars[a_index].style.height = bars[b_index].style.height;
      bars[b_index].style.height = min;
   }

   function printBars(result, result_index, arr_index) {
      let bars = qsa(".bar");
      bars[arr_index].style.height = result[result_index] * 2.5 + "%";
   }

   // sets heights of bars
   function setBarHeights(arr) {
   let bars = qsa(".bar");
      for (let i = 0; i < bars.length; i++) {
         bars[i].style.height = arr[i] * 2.5 + "%";
      }
   }

   // randomize bars and array values
   function makeNewBars() {
      arr = [];                                                                  // clears current array values
      arr3 = [];
      id("sortingAnimation").innerHTML = "";                                     // clears current bars
      let sliderVal = id("slider").value;
      for (let i = 0; i < sliderVal; i++) {                                      // loop up to value on slider
         arr[i] = Math.floor(Math.random() * maxArrayValue + 1);                 // randomize array value
         arr3 = arr.slice(0,i);
         while (arr3.includes(arr[i])) {
            arr[i] = Math.floor(Math.random() * maxArrayValue + 1);
         }
         let bar = gen("div");
         bar.classList.add("bar");
         bar.style.height = arr[i] * 2.5 + "%";                                  // make new bar with height according to array value
         bar.style.width = 60 / sliderVal + "%";
         id("sortingAnimation").appendChild(bar);                                // append to animation container
      }
      arr2 = arr.slice();
   }


   // /* ------------------------------ Helper Functions  ------------------------------ */
   //
   // /**
   //  * Returns the element that has the ID attribute with the specified value.
   //  * @param {string} idName - element ID
   //  * @returns {object} DOM object associated with id.
   //  */
   // function id(idName) {
   //   return document.getElementById(idName);
   // }
   //
   // // creates object of the first id, class, or element
   // //    returns: object of first id, class, or element
   // function qs(selector) {
   //    return document.querySelector(selector);
   // }
   //
   // // creates array of objects by like id, class, or elements
   // //    returns: array of like id, class, or elements
   // function qsa(selector) {
   //    return document.querySelectorAll(selector);
   // }
   //
   //
   // function gen(elType) {
   //    return document.createElement(elType);
   // }
   //
   // /**
   //  * Helper function to return the response's result text if successful, otherwise
   //  * returns the rejected Promise result with an error status and corresponding text
   //  * @param {object} response - response to check for success/error
   //  * @returns {object} - valid result text if response was successful, otherwise rejected
   //  *                     Promise result
   //  */
   // function checkStatus(response) {
   //    if (response.status >= 200 && response.status < 300) {
   //      return response.text();
   //    } else {
   //      return Promise.reject(new Error(response.status + ": " + response.statusText));
   //    }
   // }

})();
