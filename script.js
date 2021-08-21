const gridParent = document.querySelector(".container")
let gridContainer  = document.createElement("div");
gridParent.appendChild(gridContainer);

let rainbowCliked =false; 
let eraserCliked= false;

let nColumn =16;
let nRow =nColumn;
DefineGrid();

const clearButton = document.querySelector("#clear");
clearButton.addEventListener('click' , ClearSketch)

const dimensions = document.querySelector("#width-height");
const resitButton = document.querySelector("#resit-button")
resitButton.addEventListener('click' , resit);



const rainbowButton = document.querySelector("#colorful");
rainbowButton.addEventListener('click', () => {
    if (rainbowCliked) {
        rainbowCliked= false;
        rainbowButton.style.backgroundColor= "";
    }
    else {
        rainbowCliked = true;
        rainbowButton.style.backgroundColor= "blue";

    }
    console.log(rainbowCliked);
})

const eraserButton = document.querySelector("#eraser");
eraserButton.addEventListener('click', () => {
    if (eraserCliked) {
        eraserCliked= false;
        eraserButton.style.backgroundColor= "";
    }
    else {
        eraserCliked = true;
        eraserButton.style.backgroundColor= "blue";

    }
    console.log(eraserCliked);
})


//add div element for all col-row intersection and add event lisner to turn it black when it hoverd
function DefineGrid(){
    gridParent.removeChild(gridContainer);

    gridContainer = document.createElement("div");
    gridContainer.classList.add("grid");
    gridContainer.style.gridTemplateColumns = "repeat("+nColumn +",1fr)";
    gridContainer.style.gridTemplateRows = "repeat("+nRow+ ",1fr)";
    gridParent.appendChild(gridContainer);

    let columnNumber=1;
    let rowNumber=1;
    for (let i = 0; i < nRow; i++){
        
        for (let i = 0; i < nColumn; i++) {
            let divGridItem = document.createElement("div")
            divGridItem.classList.add("grid-item")
            divGridItem.setAttribute('id' , "grid-"+columnNumber+"-"+rowNumber);

            divGridItem.addEventListener("mouseover" , () => {
                if (eraserCliked) divGridItem.style.backgroundColor = "white";
                else if (rainbowCliked) ChangeColorWhenHover(divGridItem);
                else divGridItem.style.backgroundColor = "black";
            })
            gridContainer.appendChild(divGridItem);  
    
            columnNumber++;
        }
        columnNumber = 1;
        rowNumber++;
    }
}

/*function ToggleBlackRainbowClolor(divGridItem){
    if (rainbowCliked) ChangeColorWhenHover(divGridItem);
    else divGridItem.style.backgroundColor = "black";
}*/

function ChangeColorWhenHover(divGridItem){
    //divGridItem.style.backgroundColor = "black"
    if(divGridItem.style.backgroundColor === "" || divGridItem.style.backgroundColor === "white" ){
        divGridItem.style.backgroundColor = GenerateRandomColor();
    }else {

        let rgbString = divGridItem.style.backgroundColor;
        rgbString = rgbString.substring(rgbString.indexOf("(")+1 , rgbString.indexOf(")")) ;
        rgbString = rgbString.split(",");
        let r= parseInt(rgbString[0], 10) - 30;
        let g= parseInt(rgbString[1], 10) - 30;
        let b= parseInt(rgbString[2], 10) - 30;
        divGridItem.style.backgroundColor = "rgb("+r+", "+g+", "+b+")";

    }

}

function ClearSketch(){
    const gridItems = document.querySelectorAll(".grid-item");
    gridItems.forEach(gridItem => gridItem.style.backgroundColor = "white");

}

function resit(){
    const gridItems = document.querySelectorAll(".grid-item");
    gridItems.forEach(gridItem => gridItem.style.backgroundColor = "white");
    nColumn =Math.min(100, GetGridDimension() );
    nRow =nColumn;

    DefineGrid();
}

function GetGridDimension(){
    if (isNumeric(dimensions.value)) return  dimensions.value;
    else {
        dimensions.value = "";
        return nColumn;
    }
}

function GenerateRandomColor(){
    const r=Math.random()*255;
    const g=Math.random()*255;
    const b=Math.random()*255;
    //return "rgb("+r+", "+g+", "+b+")";
    return `rgb(${r},${g},${b})`
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }










