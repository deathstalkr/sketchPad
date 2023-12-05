const grid = document.querySelector(".grid");
const gridSizeBtn = document.querySelector("#grid-size-btn");
const colorPicker = document.getElementById("colorPicker");
const rainbowBtn = document.getElementById("rainbow");
const eraserBtn = document.getElementById("eraser");

let currentMode = "default";

colorPicker.oninput = (e) => {
	currentMode = "default";
	colorChange(e.target.value);
};

eraserBtn.onclick = () => (currentMode = "eraser");
rainbowBtn.onclick = () => {
	currentMode = "rainbow";
	setCurrentColor();
};

gridSizeBtn.addEventListener("click", function () {
	gridSize = prompt("Enter grid size", `24`);
	while (grid.firstChild) {
		grid.removeChild(grid.firstChild);
	}
	addGrid(gridSize);
});

function addGrid(gridSize = 16) {
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

function colorChange(currentColor = "#333333") {
	let nodeList = document.querySelectorAll(".grid-element");

	gridElement = Array.from(nodeList);

	gridElement.forEach((element) => {
		element.addEventListener("mouseenter", function () {
			if (currentMode == "rainbow") {
				this.style.backgroundColor = `${randomColor()}`;
			} else if (currentMode == "default") {
				this.style.backgroundColor = currentColor;
			} else if (currentMode == "eraser") {
				this.style.backgroundColor = "#FFFFFF";
			}
		});
	});
}

function randomInt(max = 1, min = 0) {
	// scale random number from 0 to 1 to desired min and max
	return parseInt(Math.random() * (max - min) + min);
}

function twoPlaces(sNum = "") {
	// make sure all strings have a length greater than 1
	//   eg: "f" => "0f"
	return sNum.length > 1 ? sNum : twoPlaces("0" + sNum);
}

function randomColor() {
	// make each color's hex string
	let r = twoPlaces(randomInt(255, 0).toString(16));
	let g = twoPlaces(randomInt(255, 0).toString(16));
	let b = twoPlaces(randomInt(255, 0).toString(16));
	// return hex color string
	return `#${r}${g}${b}`;
}

document.onload = addGrid();
