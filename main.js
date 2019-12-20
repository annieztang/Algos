(function() {
   "use strict";                                      // prevents use of undeclared variables

   let arr = [2, 4, 8, 3, 1, 7, 9];
   window.addEventListener("load", init);             // after window loads, run init

   /**
   *  Initializes the web page
   */
   function init() {
      // let sortAlgo = new Sort(arr);
      // sortAlgo = id("sortingAlgos").addEventListener("click").
      setBarHeights(arr);
      id("start-sort").addEventListener("click", function() {animateSelectionSort(arr)});
      // console.log(arr);
      // animateSelectionSort(arr);
      // selectionSort(arr);
      // console.log("This is selection sort: " + arr);

      // arr = [2, 4, 8, 3, 1, 7, 9];
      // console.log(arr);
      // bubbleSort(arr);
      // console.log("This is bubble sort: " + arr);
      //
      // arr = [2, 4, 8, 3, 1, 7, 9];
      // console.log(arr);
      // arr = mergeSort(arr);
      // console.log("This is merge sort: " + arr);
      //
      // arr = [2, 4, 8, 3, 9, 7, 1];
      // console.log(arr);
      // arr = insertionSort(arr);
      // console.log("This is insertion sort: " + arr);

   }

   // sets heights of bars
   function setBarHeights(arr) {
      let bars = qsa(".bar");
      for (let i = 0; i < bars.length; i++) {
         bars[i].style.height = arr[i] * 10 + "px";
      }
   }

   // animates sorting algorithm
   function animateSelectionSort(arr) {
      for (let i = 0; i < arr.length - 1; i++) {
         console.log(arr);
         let min_index = i;

         for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[min_index]) {
               min_index = j;
            }
         }
         setTimeout(swapBars, i * 500, min_index, i);
         let min = arr[min_index];
         arr[min_index] = arr[i];
         arr[i] = min;
      }
   }

   // visually swaps bars
   function swapBars(min_index, front) {
      console.log("swapped");
      let bars = qsa(".bar");
      let min = bars[min_index].style.height;
      bars[min_index].style.height = bars[front].style.height;
      bars[front].style.height = min;
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
