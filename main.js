(function() {
   "use strict";                                      // prevents use of undeclared variables
   let arr = [];
   let currentSort = "selection";
   const interval = 10;
   const maxArraySize = 25;
   const maxArrayValue = 20;
   window.addEventListener("load", init);             // after window loads, run init

   /**
   *  Initializes the web page
   */
   function init() {
      // let sortAlgo = new Sort(arr);
      // sortAlgo = id("sortingAlgos").addEventListener("click").
      makeNewBars();
      // setBarHeights(arr);
      id("start-sort").addEventListener("click", chooseSort);
      id("reset").addEventListener("click", resetSort);
      id("new-bars").addEventListener("click", makeNewBars);
      id("slider").oninput = function() {
         id("slider-value").innerText = this.value;
      }
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

   // resets bar positions and clo
   function resetSort() {
      let bars = qsa(".bar");
      arr = [2, 4, 8, 3, 1, 7, 9];
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

   function colorBars(color, index, k) {
      let bars = qsa(".bar");
      setTimeout(function() {
         bars[index].style.backgroundColor = color;
      }, k * interval);
   }

   // visually swaps bars
   function swapBars(a_index, b_index) {
      console.log("swapped");
      let bars = qsa(".bar");
      let min = bars[a_index].style.height;
      bars[a_index].style.height = bars[b_index].style.height;
      bars[b_index].style.height = min;
   }

   // randomize bars and array values
   function makeNewBars() {
      arr = [];                                // clears current array values
      id("sortingAnimation").innerHTML = "";   // clears current bars
      let sliderVal = id("slider").value;
      for (let i = 0; i < sliderVal; i++) {             // loop up to value on slider
         arr[i] = Math.floor(Math.random() * maxArrayValue + 1); // randomize array value
         let bar = gen("div");
         bar.classList.add("bar");
         bar.style.height = arr[i] * 10 + "px";                  // make new bar with height according to array value
         bar.style.width = 60 / sliderVal + "%";
         id("sortingAnimation").appendChild(bar);                // append to animation container
      }
      console.log(arr);
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
