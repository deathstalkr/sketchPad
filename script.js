let grid = document.querySelector(".grid");
const gridSizeBtn = document.querySelector("#grid-size-btn");
let gridSize = 16;
let currentColor = "#333333";
let colorPicker = document.getElementById("colorPicker");

colorPicker.oninput = (e) => setCurrentColor(e.target.value);

addGrid(gridSize);

gridSizeBtn.addEventListener("click", function () {
	gridSize = prompt("Enter grid size", `24`);
	while (grid.firstChild) {
		grid.removeChild(grid.firstChild);
	}
	addGrid(gridSize);
});

function addGrid(gridSize) {
	grid.setAttribute(
		"style",
		`max-width: ${gridSize * 31}px; max-height: ${gridSize * 31}px;`
	);
	for (let i = 1; i <= gridSize * gridSize; i++) {
		divBox = document.createElement("div");
		divBox.setAttribute("class", "grid-element");
		grid.appendChild(divBox);
	}
	colorChange(currentColor);
}

function colorChange(currentColor) {
	let nodeList = document.querySelectorAll(".grid-element");

	gridElement = Array.from(nodeList);

	gridElement.forEach((element) => {
		element.addEventListener("mouseenter", function () {
			this.style.backgroundColor = currentColor;
		});
	});
}

function setCurrentColor(newColor) {
	currentColor = newColor;
	colorChange(currentColor);
}

// gridElement.addEventListener('mouseenter', () => {
//     this.StylePropertyMap.cssText = 'background-color: black;'
// })
