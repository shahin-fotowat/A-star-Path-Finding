
var rows = 5;  // Number of rows in the grid
var cols = 5;  // Number of columns in the grid
var grid = new Array(rows); // Create the grid
var openList   = []; //List of nodes that still need to be evaluated
var closedList = []; //List of nodes that have finished being evaluated
//function constructor
function nodes() {
    this.f = 0;
    this.g = 0;
    this.h = 0;
}


function setup() {
    createCanvas(400, 400);
    console.log("A*");

    for(var i = 0; i < rows; i++) {
        for(var j = 0; j < cols; j++) {
            grid[i][j] = new nodes();

        }
    }


    starting_node = grid[0][0]; //Starting node top_left
    ending_node = grid[rows - 1][cols - 1]; // Ending node bottom right

    //start from the starting point added to the list
    openList.push(starting_node);
    console.log(grid);
}

function draw() {
    background(0);
}
