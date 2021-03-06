"use strict";
(function() {
  const TODOLISTURL = "img/todoList/";

  window.addEventListener('load', init);

  function init() {
    initializeIcons();
    let addNewEvent = qsa(".addList");
    for (let i = 0; i < addNewEvent.length; i++) {
      addNewEvent[i].addEventListener('click', addEvent);
    }
    floatWindow();
  }

  function floatWindow() {
    // Get the modal
    var modal = id("addMyTask");

    // Get the button that opens the modal
    var btn = id("addCalenderBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal
    btn.onclick = function() {
      modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }

  // enable all the defalt icons on the page
  function initializeIcons() {
    let deleteIcons = qsa('.deleteBox');
    for (let i = 0; i < deleteIcons.length; i ++) {
      deleteIcons[i].addEventListener('click', deleteTask);
    }

    let uncheckedCircle = qsa('.checkCircle');
    for (let i = 0; i < uncheckedCircle.length; i ++) {
      uncheckedCircle[i].addEventListener('click', clickCheckCircle);
    }
  }

  // add the event when click the icon
  function addEvent() {
    let newEvent = this.nextElementSibling;
    if (newEvent.value && this.parentNode.querySelectorAll("input")[1].value) {
      genNewEventBox(newEvent);
    }
  }

  // add a new event to the event list
  function genNewEventBox(newEvent) {
    let newDiv = gen('div');
    let newP = gen('p');
    newP.textContent = newEvent.value;
    newDiv.classList.add('event');
    let circle = generateCheckCircle("red_circle");
    let delectCircle = genereateDeleteCircle();

    let time = gen('p');
    time.classList.add('timePTag');
    time.textContent = newEvent.parentNode.querySelectorAll("input")[1].value;

    // add elements to the container box
    newDiv.appendChild(circle);
    newDiv.appendChild(newP);
    newDiv.appendChild(time);
    newDiv.appendChild(delectCircle);
    newEvent.parentNode.parentNode.appendChild(newDiv);
  }

  // generate the delete circle at the end of each task
  function genereateDeleteCircle() {
    let img = gen('img');
    img.src = TODOLISTURL + 'X.png';
    img.alt = 'Event delete box';
    img.classList.add('deleteBox');
    img.addEventListener('click', deleteTask)
    return img;
  }

  // add actions to the check circle
  function clickCheckCircle() {
    this.nextElementSibling.classList.add('crossed');
    // move to bottom of the list
    let currentDiv = this.parentNode;
    let checkedCircle = generateCheckCircle("check_circle");
    this.parentNode.replaceChild(checkedCircle, this);
    currentDiv.parentNode.parentNode.appendChild(currentDiv);
  }

  // delete the current task
  function deleteTask() {
    this.parentNode.parentNode.removeChild(this.parentNode);
  }

  // generate the red check circle at the begining of each task
  function generateCheckCircle(name) {
    let img = gen('img');
    img.src = TODOLISTURL + name + '.png';
    img.alt = 'Event check box';
    img.classList.add('checkCircle');
    img.addEventListener('click', clickCheckCircle)
    return img;
  }

  /**
   * Returns a new element with the given tag name.
   * @param {string} tagName - HTML tag name for new DOM element.
   * @returns {object} New DOM object for given HTML tag.
   */
  function gen(tagName) {
    return document.createElement(tagName);
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} id - element ID
   * @return {object} DOM object associated with id.
   */
  function id(id) {
    return document.getElementById(id);
  }

  /**
   * Returns the array of elements that match the given CSS selector.
   * @param {string} query - CSS query selector
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qsa(query) {
    return document.querySelectorAll(query);
  }
})();