(function() {
   "use strict";                                      // prevents use of undeclared variables

   let arr = [2, 4, 8, 3, 1, 7, 9];
   let currentSort = "selection";
   const interval = 500;
   window.addEventListener("load", init);             // after window loads, run init

   /**
   *  Initializes the web page
   */
   function init() {
      // let sortAlgo = new Sort(arr);
      // sortAlgo = id("sortingAlgos").addEventListener("click").
      setBarHeights(arr);
      id("start-sort").addEventListener("click", chooseSort);
      id("reset").addEventListener("click", resetSort);
   }

   // sets heights of bars
   function setBarHeights(arr) {
      let bars = qsa(".bar");
      for (let i = 0; i < bars.length; i++) {
         bars[i].style.height = arr[i] * 10 + "px";
      }
   }

   // Selects the animation for the bars
   function chooseSort() {
      currentSort = id("sortingOptions").value;
      if (currentSort == "selection") {
         animateSelectionSort(arr);
      } else {
         animateBubbleSort(arr);
      }
   }

   // resets bar positions
   function resetSort() {
      let bars = qsa(".bar");
      arr = [2, 4, 8, 3, 1, 7, 9];
      setBarHeights(arr);
      for (let i = 0; i < bars.length; i++) {
         bars[i].classList.remove("sorted");
      }
   }

   // animates sorting algorithm
   function animateSelectionSort(arr) {
      let bars = qsa(".bar");
      let k = 1;
      for (let i = 0; i < arr.length - 1; i++) {
         let min_index = i;
         setTimeout(function() {
            bars[i].classList.add("sorted"); // first element green
         }, k * interval);

         for (let j = i + 1; j < arr.length; j++) {
            setTimeout(function() {
               bars[j].classList.add("iterator");
            }, k * interval);
            k += 0.5;

            if (arr[j] < arr[min_index]) { // if min val found, turn BOTH first and min bar RED
               setTimeout(function() {                  // shows iterator for 0.5, then turn red
                  bars[min_index].classList.remove("not-sorted");
                  bars[j].classList.remove("iterator"); // remove highlight from j/min val
                  bars[j].classList.add("not-sorted"); // turn j/min val RED
                  bars[i].classList.remove("sorted"); // (Remove green) from 1st element
                  bars[i].classList.add("not-sorted"); // add red to 1st element
                  min_index = j;
               }, k * interval);
               min_index = j;
            }

            // red (or nothing) add .5 seconds

            k += 0.5;
            setTimeout(function() {
               bars[j].classList.remove("iterator"); // remove iterator color (in case)
            }, k * interval);
         }

         setTimeout(swapBars, k * interval, min_index, i);
         let min = arr[min_index];
         arr[min_index] = arr[i];
         arr[i] = min;

         // mark 1st element as sorted, remove all classes from rest
         setTimeout(function() {
            bars[i].classList.remove("not-sorted");
            bars[i].classList.add("sorted");
            bars[min_index].classList.remove("not-sorted");
            bars[min_index].classList.add("sorted");
         }, k * interval);

         k += 1;

         // holds green after swap, then changes second bar to purple
         setTimeout(function() {
            bars[min_index].classList.remove("sorted");
         }, k * interval);
      }
   }

   // function colorBar(bar_index, color) {
   //    bars[bar_index].style.backgroundColor = color;
   // }

   function animateBubbleSort(arr) {
      if (arr.length > 1) {
         let isSorted;
         let j = 0;       // counter for visual swaps (used to keep timing constant)
         do {
            isSorted = true;
            for (let i = 0; i < arr.length - 1; i++) {
               if (arr[i] > arr[i+1]) {
                  setTimeout(swapBars, j * interval, i, i + 1);
                  j++;
                  let placeholder = arr[i];
                  arr[i] = arr[i+1];
                  arr[i+1] = placeholder;
                  isSorted = false;
               }
            }
         } while (!isSorted);
      }
   }

   function colorBars(color, a_index, b_index) {
      let bars = qsa(".bar");
      bars[b_index].style.backgroundColor = color;
      bars[a_index].style.backgroundColor = color;
   }

   // visually swaps bars
   function swapBars(a_index, b_index) {
      console.log("swapped");
      let bars = qsa(".bar");
      let min = bars[a_index].style.height;
      bars[a_index].style.height = bars[b_index].style.height;
      bars[b_index].style.height = min;
   }


   /* ------------------------------ Helper Functions  ------------------------------ */

   /**
    * Returns the element that has the ID attribute with the specified value.
    * @param {string} idName - element ID
    * @returns {object} DOM object associated with id.
    */
   function id(idName) {
     return document.getElementById(idName);
   }

   // creates object of the first id, class, or element
   //    returns: object of first id, class, or element
   function qs(selector) {
      return document.querySelector(selector);
   }

   // creates array of objects by like id, class, or elements
   //    returns: array of like id, class, or elements
   function qsa(selector) {
      return document.querySelectorAll(selector);
   }


   function gen(elType) {
      return document.createElement(elType);
   }

   /**
    * Helper function to return the response's result text if successful, otherwise
    * returns the rejected Promise result with an error status and corresponding text
    * @param {object} response - response to check for success/error
    * @returns {object} - valid result text if response was successful, otherwise rejected
    *                     Promise result
    */
   function checkStatus(response) {
      if (response.status >= 200 && response.status < 300) {
        return response.text();
      } else {
        return Promise.reject(new Error(response.status + ": " + response.statusText));
      }
   }

})();
