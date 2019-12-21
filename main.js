(function() {
   "use strict";                                      // prevents use of undeclared variables

   let arr = [2, 4, 8, 3, 1, 7, 9];
   let currentSort = "selection";
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
      arr = [2, 4, 8, 3, 1, 7, 9];
      setBarHeights(arr);
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

   function animateBubbleSort(arr) {
      if (arr.length > 1) {
         let isSorted;
         let j = 0;       // counter for visual swaps (used to keep timing constant)
         do {
            isSorted = true;
            for (let i = 0; i < arr.length - 1; i++) {
               if (arr[i] > arr[i+1]) {
                  setTimeout(swapBars, j * 500, i, i+1);
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
