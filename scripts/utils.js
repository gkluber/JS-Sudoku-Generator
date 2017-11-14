//excludes the current cell
var getBlockSet = function(grid,cx,cy)
{
	var set = new Array();
	var bx = 3*Math.floor(cx/3.0), by = 3*Math.floor(cy/3.0);
	for(var i=0; i<3; i++)
		for(var j=0; j<3; j++)
		{
			if(bx+i==cx&&by+j==cy)
				continue;
			set.push(grid[bx+i][by+j]);
		}
	return set;
}

//excludes the current cell
var getRowSet = function(grid,cx,cy)
{
	var set = new Array();
	for(var i=0; i<9; i++)
	{
		if(i==cx)
			continue;
		set.push(grid[i][cy]);
	}
	return set;
}

//excludes the current cell
var getColSet = function(grid,cx,cy)
{
	var set = new Array();
	for(var i=0; i<9; i++)
	{
		if(i==cy)
			continue;
		set.push(grid[cx][i]);
	}
	return set;
}

//set is array of arrays
var combineSets = function(sets)
{
	var unrolled = new Array();
	for(var i=0; i<sets.length; i++)
		for(var j=0; j<sets[i].length; j++)
			unrolled.push(sets[i][j]);
	return unrolled;
}

//returns either a list of cell objects or a list of numbers
var getSector = function(grid,cx,cy)
{
	return combineSets([getBlockSet(grid,cx,cy),getRowSet(grid,cx,cy),getColSet(grid,cx,cy)]);
}