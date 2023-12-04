let grid = document.querySelector(".grid");
const gridSizeBtn = document.querySelector("#grid-size-btn");
let gridSize = 16;
addGrid(gridSize);

gridSizeBtn.addEventListener("click", function () {
	gridSize = prompt("Enter grid size", `32`);
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
	colorChange();
}

function colorChange() {
	let nodeList = document.querySelectorAll(".grid-element");
	console.log("nodeList:", nodeList);

	gridElement = Array.from(nodeList);
	console.log("gridElement:", gridElement);

	gridElement.forEach((element) => {
		element.addEventListener("mouseenter", function () {
			this.style.backgroundColor = "black";
		});
	});
}

// gridElement.addEventListener('mouseenter', () => {
//     this.StylePropertyMap.cssText = 'background-color: black;'
// })
