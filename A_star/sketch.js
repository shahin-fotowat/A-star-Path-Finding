
var rows = 80;  // Number of rows in the grid
var cols = 80;  // Number of columns in the grid
var grid = new Array(rows); // Create the grid
var openList   = []; //List of nodes that still need to be evaluated
var closedList = []; //List of nodes that have finished being evaluated
var canvas_width  = 2550; //Width of the canvas
var canvas_height = 920; //Height of the canvas
var width_dist, height_dist; //vertical and horizontal distances between
                             //each node to be calculated

//-----------------------------------------------------------------------------
// Remove the evaluated node from openList
function remove_element(arr, element) {
    for(var i = arr.length - 1; i >= 0; i--) {
        if(arr[i] === element) {
            arr.splice(i, 1)
        }
    }
}
//-----------------------------------------------------------------------------
//function constructor
function Node(x_val, y_val) {
    this.x = x_val;  // X-coordinate of the node
    this.y = y_val;  // Y-coordinate of the node
    this.f = 0;
    this.g = 0;
    this.h = 0;

    // Display the node
    this.display = function(node_color) {
        fill(node_color);
        noStroke();
        rect(this.x * width_dist, this.y * height_dist,
            width_dist - 1, height_dist - 1);
    }
}
//-----------------------------------------------------------------------------
function setup() {
    createCanvas(canvas_width, canvas_height);
    console.log("A*");

    // Vertical and horizontal distance between every nodes
    width_dist  = canvas_width / cols;
    height_dist = canvas_height / rows;

    // Creating a 2D array
    for(var i = 0; i < rows; i++) {
        grid[i] = new Array(cols);
    }

    //Creates a node object for each point and sets the x and y coordinate
    for(var i = 0; i < rows; i++) {
        for(var j = 0; j < cols; j++) {
            grid[i][j] = new Node(i, j);
        }
    }
    starting_node = grid[0][0]; //Starting node top_left
    ending_node = grid[rows - 1][cols - 1]; // Ending node bottom right

    //start from the starting point added to the list
    openList.push(starting_node);
    console.log(grid);
}
//-----------------------------------------------------------------------------
function draw() {
    background(0);

    if(openList.length > 0) {

        lowest_cost = 0;  //index of the node with the loswest cost to the end
        //compares the temp lowest cost to the other node available in the
        //openList and finds the lowest of all
        for(var i = 0; i < openList.length; i++) {
            if(openList[i] < openList[lowest_cost]) {
                lowest_cost = i;
            }
        }
        //if the lowest cost found is the ending point, then we're finished
        if(openList[lowest_cost] === ending_node) {
            console.log("Searched is finished!");
        }
        //Add the evaluated node to the closedList
        closedList.push(openList(lowest_cost));
        //Remove the evaluated node from the openList
        openList.remove_element(openList, openList[lowest_cost]);
    } else {
        //Stop
    }

    for(var i = 0; i < rows; i++) {
        for(var j = 0; j < cols; j++) {
            // i and j represent the x and y coordinates of the nodes
            grid[i][j].display(color(255));
        }
    }


    for(var i = 0; i < openList.length; i++) {
        openList[i].display(color(0,255,0));
    }

    for(var i = 0; i < closedList.length; i++) {
        closedList[i].display(color(255,0,0));
    }






}
