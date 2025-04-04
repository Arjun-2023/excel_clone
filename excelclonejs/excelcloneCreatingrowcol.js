// grid--> construction you can run
//rows 0 to 99 and 
// col--> 0 to 25

//let cellElementsDiv = document.querySelector(".cell-elements");


let spreadsheet = document.getElementById("spreadsheet");

function cellElementscreate(){
    
   
    let cellElements = "<div class='top-row'>";
    cellElements +="<div class='top-left-cell'></div>";
    cellElements +="<div class ='placeholder'></div>";

    for(let i=0;i<26;i++){
        cellElements +=`<div class = 'top-row-cell'>${String.fromCharCode(65+i)}</div>`;
    }

    cellElements +="</div>";

    //generating rows

    for(let i=0;i<100;i++){
        cellElements +=`<div class = 'row'>`;

        //left coloumn for row numbers

        cellElements +=`<div  class = 'left-column-cell'  >${i+1}</div>`;
        cellElements +=`<div class ='placeholder2'></div>`;

        //cells for each row

        for(let j=0;j<26;j++){
            cellElements +=`<div class='cell' rowid='${i}' colid='${j}' contentEditable = 'true'></div>`;
        }
        cellElements +="</div>";
    }
    
    spreadsheet.innerHTML = cellElements;


//imp how to get the adress of the cell , for that-
//we gave rowid,colid to everycell while construction
//to  get the address->rowid+1,character(colid+65)
//so we use formatting will work in the case of cells
//when a button is clicked ->check the adress->current adress findout->
//rowid,colid->update the div
// here 2d array state save rakhte he for  whole grid for each and every--
//  --status of grid w.r.t time and changes
// if we use react then we done this by using redux library
//eg. value, formula, italic etc


    //now we are creating 2d array which store data for ech cells

      let db ; // it represent the current db
    //it will store all db's corresponding to sheet number
   
    let sheetsDB = [];

    function createDB(){
        let newDB = [];
        for(let i=0;i<100;i++){
            let row =[];
            for(let j=0;j<26;j++){
                //i j
                let name = String.fromCharCode(j+65) + (i+1) + ""; // not so imp. but good for trackking
                let cellObject = {
                    name : name,
                    value: "",
                    formula: "",
                    childrens:[],
                    parents:[],
                }
                row.push(cellObject);
            }
            newDB.push(row);
        
        }
        sheetsDB.push(newDB);
        db = sheetsDB[sheetsDB.length-1];
       // console.log(db);
    }

    createDB();

// somewhere we have databse where data is stored
//eg.  let db=[[{}]]-> 
// let db = [[{ 
// name:A1,
// value = "",
// formula : "",
// isItalic: false,
// isBold : false,
// color: ,
//background: 
// }]]


window.db = db;

}
cellElementscreate();

//  we maintain/handle multiple sheets db by using 3d array of db ->  
//which contains sheets 2d array

//eg.
// let row1=[{name:"A1"},{name:"A2"}];
// let row2=[{name:"A1"},{name:"A2"}];
// let shhet1=[row1,row2];
// let sheet2=[row1,row2];
//let db = [sheet1, sheet2]
