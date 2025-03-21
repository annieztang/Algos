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
