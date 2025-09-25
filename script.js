//dragging n droppping icons
//disable the cursor from interact js
interact(".draggable").draggable({
  cursorChecker: () => null,
  listeners: { move: dragMoveListener },
});
interact(".window").draggable({
  cursorChecker: () => null,
  listeners: { move: dragMoveListener },
});
// target elements with the "draggable" class
interact(".draggable").draggable({
  // enable inertial throwing
  inertia: false,
  // keep the element within the area of it's parent
  modifiers: [
    interact.modifiers.restrictRect({
      restriction: "body",
      endOnly: true,
    }),
  ],
  // enable autoScroll
  autoScroll: false,

  listeners: {
    // call this function on every dragmove event
    move: dragMoveListener,

    // call this function on every dragend event
  },
});

function dragMoveListener(event) {
  var target = event.target;
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
  var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

  // translate the element
  target.style.transform = "translate(" + x + "px, " + y + "px)";

  // update the posiion attributes
  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);
}

//playing sounds
const clickSound = new Audio("assets/sounds/clickSfx.mp3");

document.querySelectorAll(".iconimg").forEach((icon) => {
  icon.addEventListener("click", () => {
    clickSound.currentTime = 0;
    clickSound.play();
  });
});

//draging windows
// Make all windows draggable (header only)
interact(".window").draggable({
  allowFrom: ".window-header",
  // keep the element within the area of it's parent
  modifiers: [
    interact.modifiers.restrictRect({
      restriction: "body",
      endOnly: true,
    }),
  ],
  listeners: {
    move(event) {
      const target = event.target;
      const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
      const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

      target.style.transform = `translate(${x}px, ${y}px)`;
      target.setAttribute("data-x", x);
      target.setAttribute("data-y", y);
    },
  },
});

//opening n closing tabs
// Keep track of open windows
const openWindows = {};

// Icons and their corresponding windows
const windowsMap = {
  "drag-1": "about-window",
  "drag-2": "links-window",
  "drag-3": "work-window",
  "drag-4": "contact-window",
};

// Loop through each icon → setup open/close behavior
Object.entries(windowsMap).forEach(([iconId, windowId]) => {
  const icon = document.getElementById(iconId);
  const windowEl = document.getElementById(windowId);
  const closeBtn = windowEl.querySelector(".close-btn");

  // Double-click to open window
  icon.addEventListener("dblclick", () => {
    if (!openWindows[windowId]) {
      windowEl.style.display = "flex";
      openWindows[windowId] = true;
    }
    bringToFront(windowEl);
  });

  // Close button
  closeBtn.addEventListener("click", () => {
    windowEl.style.display = "none";
    openWindows[windowId] = false;
    clickSound.currentTime = 0;
    clickSound.play();
  });

  //Clicking on window itself also brings it to front
  windowEl.addEventListener("mousedown", () => {
    bringToFront(windowEl);
  });
});

let topZ = 20;

function bringToFront(el) {
  el.style.zIndex = ++topZ;
}
