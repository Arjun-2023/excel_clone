// here we first get positon/location/address  data  of each cell
// cell-> formula remove/value set
//we gave already provided rowid and colid to each cell while construction
//to get the position data - rowid+1 and String.toCharcode(colid+65) converted into character

//formatting providing input, edit,storing , removing
//in case of cell we gave rowid and colid to each cell during contruction of cell
//so when a button is clicked it checked the position
//---------------------------------------------------------------------
//here we have constraints 
//* Grid
// **columns:26
//** rows:100
////////////////////////////////////////////////////
//*formula->
//** Syntax: they only have opening and closing brace and-
// - space between each token
// ** set,update:formula bar
//---------------------------------------------
// #OBSERVATION
// ** Possible source of data for a cell**
// **user defined value
// **formula

//--------------------------------------------------------------------
// **Possible interaction with a formula
//* formula set->empty->formula[done in formulaBar]
//*formula update-> old formula->new formula[done in formula bar]
//*formula remove->formula ->value[cells]
//value->empty->user defined value->[cells]

//---------------------------------------------------------------------


//let topRow = document.querySelector(".top-row");
//let leftCol = document.querySelector(".left-col");
//let topLeftCell = document.querySelector(".top-left-cell");


let allCells = document.querySelectorAll(".cell");
//console.log(allCells.length);
let locationInput = document.querySelector("#location");
let formulaInput = document.querySelector("#formula");
let lastSelectedCell;
//console.log(db);


let topRow = document.querySelector(".top-row");
let topLeftCell = document.querySelector(".top-left-cell");
//let topRowCell = document.querySelector("top-row-cell");
//let Row = document.querySelector(".row");
let leftColumnCell = document.querySelectorAll(".left-column-cell");

spreadsheet.addEventListener("scroll", function(e){
    
    let top = e.target.scrollTop;
    let left = e.target.scrollLeft;
   
     topRow.style.top = top + "px";
      //topLeftCell.style.top = top + "px";
      topLeftCell.style.left = left + "px";

    // Move left column (row numbers) vertically
   leftColumnCell.forEach(cell => {
        cell.style.left = left + "px";
    });
  
   
});


for(let i=0;i<allCells.length;i++){
    allCells[i].addEventListener("click", function(e){
        let rowId = Number(e.target.getAttribute("rowid"));

        let colId = Number(e.target.getAttribute("colid"));
       // console.log("rowId ", rowId, " colId ", colId  )
        let  cellObject = db[rowId][colId];
        let location = String.fromCharCode(65+colId) + (rowId+1 ) + "";
        //console.log("location" , location);
        locationInput.value = location;
        formulaInput.value = cellObject.formula;
    });

    allCells[i].addEventListener("blur", function(e){
        
        lastSelectedCell = e.target;
        let cellValue = e.target.textContent;
       // console.log(cellValue);
        let rowId = e.target.getAttribute("rowid");
        let colId = e.target.getAttribute("colid");
        let cellObject = db[rowId][colId];

        if(cellObject.value == cellValue){
            return ;
        }


        if(cellObject.formula){
            removeFormula(cellObject);
            //formulaInput value = " "

            formulaInput.value = "";
        }

        //db update, cellobject value if not same
        cellObject.value = cellValue;
       // console.log(cellObject.value);

        //update childrens
        updateChildrens(cellObject);
        
    })
    //using blur above to set values before and after


    //----- we use keydown event

    allCells[i].addEventListener("keydown", function(e){
       // console.log("keydtressed", e.key);
        if(e.key == "Backspace"){
            let cell = e.target;
            let {rowId,colId} = getRowIdColIdFromElement(cell);
            let cellObject = db[rowId][colId];
            if(cellObject.formula){
                cellObject.formula = "";
                formulaInput.value = "";
                removeFormula(cellObject);
                cell.textContent = "";
            }
        }
    })


}

//when someone leaves the formula input!!

formulaInput.addEventListener("blur", function(e){
    let formula = e.target.value; // A1 + A2
   // console.log(formula);
    if(formula){
        let {rowId, colId} = getRowIdColIdFromElement(lastSelectedCell);
        let cellObject = db[rowId][colId];
        //if cellObject already had a formula
        if(cellObject.formula){
            removeFormula(cellObject);
        }
        let finalValue = solveFormula(formula , cellObject);

        //formula update
        cellObject.formula = formula;

        //cellObject value update
        cellObject.value = finalValue;

        //ui  update
        lastSelectedCell.textContent = finalValue;

        //update Childrens !!!
        updateChildrens(cellObject);

    }
})



const italicBtn = document.querySelector("#italic");
italicBtn.addEventListener("click", function(){
    console.log(db);
    let location  = locationInput.value;
    let colId = location.charCodeAt(0)-65;
    let rowId = Number(location.substring(1))-1;

    //console.log("position", position, "rowId colId", rowId, colId);
        
    
    let cell = document.querySelector(`div[rowid='${rowId}'][colid = '${colId}']`);
    cell.style.fontStyle = "italic";
})


