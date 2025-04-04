function removeFormula(cellObject){
    cellObject.formula = "";
    for(let i =0; i<cellObject.parents.length; i++){
        let parentName = cellObject.parents[i];
        let {rowId, colId} = getRowIdColIdFromLocation(parentName);
        let parentCellObject = db[rowId][colId];

        let updatedChildrens = parentCellObject.childrens.filter(function(children){
            return children != cellObject.name;
        })

        parentCellObject.childrens = updatedChildrens;
        
    }
    cellObject.parents = [];
}

function getRowIdColIdFromElement(element){
   // console.log("element ", element);
    let rowId = element.getAttribute("rowid");
    let colId = element.getAttribute("colid");
    return{
        rowId,
        colId,
    };
}

function getRowIdColIdFromLocation(location){
    let rowId = Number(location.substring(1)-1);
    let colId = location.charCodeAt(0)-65;
    return {
        rowId,
        colId,
    };
}

function updateChildrens(cellObject){
    //{
    //  name:"A1",
    //  value: "100",
    // formula: "",
    // childrens: ["B1" , "C!"]
    //}

    for(let i=0;i<cellObject.childrens.length;i++){
        let childrenName = cellObject.childrens[i];
        let {rowId, colId} = getRowIdColIdFromElement(childrenName);
        let childrenCellObject = db[rowId][colId];

        //{
    //  name:"B1",
    //  value: "30",
    // formula: "( "A1" , "A2" )",
    // childrens: [];
    //}

      let newValue = solveFormula(childrenCellObject.formula);

      //ui update
      document.querySelector(`div[rowid='${rowId}'][colid='${colId}]`).textContent = newValue;
      
      //db update
      childrenCellObject.value = newValue;
      updateChildrens(childrenCellObject);
    }

}

function solveFormula(formula, selfCellObject){
    let formulaEntities = formula.split(" "); //"( A1 + A2 )" =>"( 10 + 20 )"

    //["(" , "A1" , "+" "A2" , ")"];
    //this loop replace value lof A1 and A2 in formula with their respective cell values !!
     for(let i=0;i<formulaEntities.length;i++){
        let formulaEntity = formulaEntities[i];
        if(formulaEntity[0] >= "A" && formulaEntity[0] <= "Z"){
            // valid formula component
            //A1 => Z100
            let {rowId,colId} = getRowIdColIdFromLocation(formulaEntity);
            let cellObject = db[rowId][colId]; 
            let value = cellObject.value;

            if(selfCellObject){
                //push yourself in the children of formula Components cellObject

                cellObject.childrens.push(selfCellObject.name);
            }
            formula = formula.replace(formulaEntity, value);
        }
     }
    
     let finalValue = eval(formula);
     return finalValue;
}