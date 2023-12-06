const GRID = document.querySelector("#grid");
const COLORPICKER = document.getElementById("colorPicker");
const RAINBOWBTN = document.getElementById("rainbow");
const ERASERBTN = document.getElementById("eraser");
const RESETBTN = document.getElementById("reset");
const SIZEINPUT = document.getElementById("gridSize");
const GRIDVALUE = document.getElementById("gridValue");

let currentMode = "color";
let inputGridSize;

GRIDVALUE.textContent = `Grid Size: 16 x 16`;

SIZEINPUT.addEventListener("input", function (e) {
	inputGridSize = e.target.value;
	GRIDVALUE.textContent = `Grid Size: ${inputGridSize} x ${inputGridSize}`;
	createGrid(inputGridSize);
});

RESETBTN.onclick = () => {
	activateButton("reset")
	currentMode = "color";
	createGrid(inputGridSize);
};

COLORPICKER.oninput = (e) => {
	activateButton("color")
	currentMode = "color";
	colorChange(e.target.value);
};

ERASERBTN.onclick = () => {
	activateButton("eraser");
	currentMode = "eraser";
};

RAINBOWBTN.onclick = () => {
	activateButton("rainbow");
	currentMode = "rainbow";
	colorChange();
};

function createGrid(newGridSize) {
	while (GRID.firstChild) {
		GRID.removeChild(GRID.firstChild);
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
		GRID.appendChild(createDiv(GRID.clientWidth / gridSize));
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
			} else if (currentMode == "color") {
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

function activateButton(newMode) {
	if (currentMode == "rainbow") {
		RAINBOWBTN.classList.remove("active");
	} else if (currentMode == "eraser") {
		ERASERBTN.classList.remove("active");
	}

	if (newMode == "rainbow") {
		RAINBOWBTN.classList.add("active");
	} else if (newMode == "eraser") {
		ERASERBTN.classList.add("active");
	}
}

document.onload = addGrid();
