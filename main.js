(function() {
   "use strict";

   window.addEventListener("load", init);

   /**
   *  Initializes the web page
   */
   function init() {
      let arr = [2, 4, 8, 3, 1, 7, 9];
      setBarHeights(arr);
      console.log(arr);
      selectionSort(arr)
      console.log("This is selection sort: " + arr);

      arr = [2, 4, 8, 3, 1, 7, 9];
      console.log(arr);
      bubbleSort(arr);
      console.log("This is bubble sort: " + arr);
   }

   function setBarHeights(arr) {
      let bars = qsa(".bar");
      console.log(bars);
      for (let i = 0; i < bars.length; i++) {
         bars[i].style.height = arr[i] * 10 + "px";
      }
   }

   function selectionSortViz(arr) {
      let bars = qsa(".bar");
      for (let i = 0; i < arr.length - 1; i++) {
         let min_index = i;

         for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[min_index]) {
               min_index = j;
            }
         }

         let min = arr[min_index];
         arr[min_index] = arr[i];
         bars[min_index].style.height = arr[i] * 10 + "px";
         arr[i] = min;
      }
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

   function qs(selector) {
      return document.querySelector(selector);
   }

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
