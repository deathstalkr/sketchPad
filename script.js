const grid = document.querySelector("#grid");
const colorPicker = document.getElementById("colorPicker");
const rainbowBtn = document.getElementById("rainbow");
const eraserBtn = document.getElementById("eraser");
const resetBtn = document.getElementById("reset");
const sizeInput = document.getElementById("gridSize");
const gridValue = document.getElementById("gridValue");

let currentMode = "default";
let inputGridSize;

gridValue.textContent = `Grid Size: 16 x 16`

sizeInput.addEventListener("input", function (e) {
	inputGridSize = e.target.value;
	gridValue.textContent = `Grid Size: ${inputGridSize} x ${inputGridSize}`
	createGrid(inputGridSize);
});

resetBtn.onclick = () => {
	currentMode = "default";
	createGrid(inputGridSize);
};

colorPicker.oninput = (e) => {
	currentMode = "default";
	colorChange(e.target.value);
};

eraserBtn.onclick = () => (currentMode = "eraser");

rainbowBtn.onclick = () => {
	currentMode = "rainbow";
	colorChange();
};

function createGrid(newGridSize) {
	while (grid.firstChild) {
		grid.removeChild(grid.firstChild);
	}
	addGrid(newGridSize);
}

function createDiv(size) {
	divBox = document.createElement("div");
	divBox.setAttribute("class", "divBox");
	divBox.style.width = `${size}px`;
	divBox.style.height = `${size}px`;

	return divBox;
}

function addGrid(gridSize = 16) {
	for (let i = 1; i <= gridSize * gridSize; i++) {
		grid.appendChild(createDiv(grid.clientWidth / gridSize));
	}
	colorChange();
}

function colorChange(currentColor = "#333333") {
	let nodeList = document.querySelectorAll(".divBox");

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
