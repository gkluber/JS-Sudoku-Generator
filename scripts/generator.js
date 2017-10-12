//returns 9x9 grid of numbers, with 0 equal to null
var inverseMethods = [];
var forwardMethods = [];
var values = [1,2,3,4,5,6,7,8,9];

//value is the value of the cell, 0 for null.
//marks is the list of pencil marks
function Cell(value, marks) {
    this.value = value;
    this.marks = marks;
}

var generatePuzzle = function()
{
	grid = new Array(9);
	for(var i=0; i<grid.length; i++)
		grid[i] = new Array(9);
	var offset =0;
	
	//generate trivial sudoku solution
	for(var i=0; i<9; i++)
	{
		for(var j=0; j<9; j++)
		{
			grid[i][j] = new Cell((j+offset)%9+1, []);
		}
		offset+=3;
		if(i%3==2)
			offset+=1;
	}
	
	//randomize the solution
	grid = randomize(grid,1000);
}

var randomize = function(grid, steps)
{
	for(var step=0; step<steps; step++)
	{
		//randomly choose the type of permutation
		random = Math.round(Math.random()*6);
		
		for(var i=0; i<9; i++)
		{
			console.log(grid[i]);
		}
		
		switch(random)
		{
			case 0: //switch the symbols used in the board
			var symbols = draw(values,2); //swap the values
			alert('symbols');
			for(var i=0; i<9; i++)
				for(var j=0; j<9; j++)
				{
					if(grid[i][j].value===symbols[1])
						grid[i][j].value = symbols[0];
					else if(grid[i][j].value===symbols[0])
						grid[i][j].value = symbols[1];
				}
			break;
			case 1: //switch the rows
			var rows = draw(values,2);
			alert(rows.toString());
			//subtract 1 from each
			alert('rows');
			rows.map(e=>e-1);
			
			//swap
			temp = clone(grid[rows[0]]);
			grid[rows[0]] = clone(grid[rows[1]]);
			grid[rows[1]] = temp;
			break;
			case 2: //switch the columns
			alert('columns');
			var cols = draw(values,2), T = transpose(grid);
			alert(cols.toString());
			//subtract 1 from each
			cols.map(e=>e-1);
			
			//swap
			console.log(T.length);
			temp = clone(T[cols[0]]);
			T[cols[0]] = clone(T[cols[1]]);
			T[cols[1]] = temp;
			grid = transpose(T);
			break;
			case 3: //swap block rows
			
			break;
			case 4: //swap block columns
			
			break;
			
			case 5: //transpose (inefficient)
			alert('transpose');
			grid = transpose(grid);
			break;
		}
	}
	return grid;
}

//REDO TO MAKE O(n/2)
var draw = function(list, number)
{
	var currentIndex = list.length-1., result=[];
	list = clone(list);
	while(currentIndex>=0&&result.length<number)
	{
		var draw = Math.round(Math.random()*currentIndex);
		result.push(list[draw]);
		list.splice(draw,1);
		currentIndex--;
	}
	return result;
}

var transpose = function(matrix)
{
	return clone(matrix).map((x,i) => matrix.map(x => x[i]))
}

var search = function(Q, GoodParents, GoodSiblings)
{
	var children = new Array(), goodchildren = new Array();
	
}

//deep-clones the board matrix
var clone = function(array)
{
	var arr = [];
	for(var i=0; i<array.length; i++)
		arr.push(array[i]);
	return arr;
}

//FORWARD METHODS
//return the set of all parents obtained by applying the method

//single candidate
var sc = function(board)
{
	var results = [];
	for(var i=0; i<8; i++)
		for(var j=0; j<8; j++)
		{
			//if(board[i][j]
			
		}
		
}

//exclusion method
var em = function(board){
	
}

//block intersection
var bi = function(board)
{
	
}

//covering set
var cs = function(board)
{
	
}

//x-wing 
var xw = function(board)
{
	
}

//INVERSE METHODS 
//return the set of all children obtained by applying the method

//inverse single candidate method
var isc = function(board)
{
	
}

//inverse exclusion method
var iem = function(board){
	
}

//inverse block intersection
var ibi = function(board)
{
	
}

//inverse covering set
var ics = function(board)
{
	
}

//inverse x-wing 
var ixw = function(board)
{
	
}

