
var rows = 45;  // Number of rows in the grid
var cols = 45;  // Number of columns in the grid
var grid = new Array(cols); // Create the grid
var openList   = []; //List of nodes that still need to be evaluated
var closedList = []; //List of nodes that have finished being evaluated
var canvas_width  = 2200; //Width of the canvas
var canvas_height = 800 ; //Height of the canvas
var width_dist, height_dist; //vertical and horizontal distances between
                             //each node to be calculated
var path = [];     //


//-----------------------------------------------------------------------------
// Remove the evaluated node from openList
function remove_element(arr, element) {
    for(var i = arr.length - 1; i >= 0; i--) {
        if(arr[i] == element) {
            arr.splice(i, 1)
        }
    }
}
//-----------------------------------------------------------------------------
function manhattanDistance(point_A, point_B) {
    //return dist(point_A.x, point_A.y, point_B.x, point_B.y);
    return abs(point_A.x - point_B.x) + abs(point_A.y - point_B.y);
}
//-----------------------------------------------------------------------------
//function constructor
function Node(x_val, y_val) {
    this.x = x_val;  // X-coordinate of the node
    this.y = y_val;  // Y-coordinate of the node
    this.f = 0;      // cost function
    this.g = 0;      // distance traveled between nodes
    this.h = 0;      // heuristic value of each node
    this.p = undefined;   // parent node of an evaluated node
    this.neighbors = [];  // list of neighbors of each node
    this.wall = false;    //

    //
    if(random(1) < 0.4) {
        this.wall = true;
    }
    //Sets the neighbors of each selected node
    this.setNeighbors = function(grid) {
        if(this.x < cols - 1) {
            this.neighbors.push(grid[this.x + 1][this.y]);
        }
        if(this.x > 0) {
            this.neighbors.push(grid[this.x - 1][this.y]);
        }
        if(this.y < rows - 1) {
            this.neighbors.push(grid[this.x][this.y + 1]);
        }
        if(this.y > 0) {
            this.neighbors.push(grid[this.x][this.y - 1]);
        }
        if(this.x > 0 && this.y > 0) {
            this.neighbors.push(grid[this.x - 1][this.y - 1]);
        }
        if(this.x < cols - 1 && this.y < rows - 1) {
            this.neighbors.push(grid[this.x + 1][this.y + 1]);
        }
    }

    // Display the node
    this.display = function(node_color) {
        fill(node_color);
        if(this.wall) {   //***********
            fill(200,150,100);
        }
        stroke(0);
        strokeWeight(0.5);
        rect(this.x * width_dist, this.y * height_dist,
             width_dist - 1, height_dist - 1);
    }
}
//-----------------------------------------------------------------------------
function setup() {
    var cnv = createCanvas(canvas_width, canvas_height);
    cnv.position(150, 90);
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

    for(var i = 0; i < rows; i++) {
        for(var j = 0; j < cols; j++) {
            grid[i][j].setNeighbors(grid);
        }
    }
    starting_node = grid[0][0]; //Starting node top_left
    ending_node = grid[rows - 1][cols - 1]; // Ending node bottom right

    starting_node.wall = false;   //
    ending_node.wall = false;     //

    //start from the starting point added to the list
    openList.push(starting_node);
    console.log(grid);
} // end setup()

//-----------------------------------------------------------------------------
function draw() {
    background(0,255,255);

    if(closedList.length > 450) { noLoop();}
    if(openList.length > 0) {
        var lowest_cost = 0;  //index of the node with the loswest cost to the end
        //compares the temp lowest cost to the other node available in the
        //openList and finds the lowest of all
        for(var i = 0; i < openList.length; i++) {
            if(openList[i].f < openList[lowest_cost].f) {
                lowest_cost = i;
            }
        }
        var evaluated_node = openList[lowest_cost];

        //if the lowest cost found is the ending point, then we're finished
        if(evaluated_node === ending_node) {
            noLoop();
        } //else {
            //Add the neighbors of the evaluated node
        //    openList[lowest_cost].setNeighbors(grid);
        //}

        //Remove the evaluated node from the openList
        remove_element(openList, evaluated_node);

        //Add the evaluated node to the closedList
        closedList.push(evaluated_node);

        //Obtain the neighbors of the node evaluated with the lowest cost
        var neighbors_list = evaluated_node.neighbors;

        //
        for(var i = 0; i < neighbors_list.length; i++) {
            neighbor = neighbors_list[i];
            //
            if(!closedList.includes(neighbor) && !neighbor.wall) {
                var tentative_g = evaluated_node.g + 1; //
                //
                if(openList.includes(neighbor)) {
                        //
                        if(tentative_g < neighbor.g) {
                            neighbor.g = tentative_g;
                        }
                } else {
                        //
                        neighbor.g = tentative_g;
                        openList.push(neighbor);
                } // end if

                //
                neighbor.h = manhattanDistance(neighbor, ending_node);
                //
                neighbor.f = neighbor.g + neighbor.h;
                //
                neighbor.p = evaluated_node;
            } // end if
        } // end for
    } else {
        console.log("Solution does not exist!");
        noLoop();
    }

    // Displays the background of the canvas grid as white
    for(var i = 0; i < rows; i++) {
        for(var j = 0; j < cols; j++) {
            // i and j represent the x and y coordinates of the nodes
            grid[i][j].display(color(255));
        }
    }

    // Display the nodes to be evaluated as green
    for(var i = 0; i < openList.length; i++) {
        openList[i].display(color(0,255,0));
    }

    // Display the evaluated nodes as red
    for(var i = 0; i < closedList.length; i++) {
        closedList[i].display(color(255,0,0));
    }

    path = [];
    var temp  = evaluated_node;
    path.push(temp);
    while(temp.p) {
        path.push(temp.p);
        temp = temp.p;
    }

    if(closedList.length < 450) {
    // Display the shortest path as blue
        for(var i = 0; i < path.length; i++) {
            path[i].display(color(0,0,255));
        }
    }

} // end draw()
