//hints passed in the form of a 9x9 matrix
var grid;
var hints = [];
var pencilmarks = [];
var wrong = [];
//the set of all changes effected during the game
var hist = [];
var xCur=0, yCur=0;

var setGrid = function(matrix){
	grid = matrix;
}

//constructs the change object for changing cell at cx,cy to v
var getChange = function(cx, cy, v)
{
	return {"x":cx,"y":cy,"value":v};
}

var getBlockSet = function(cx,cy)
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

var getRowSet = function(cx,cy)
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

var getColSet = function(cx,cy)
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

var getSector = function(cx,cy)
{
	return combineSets([getBlockSet(cx,cy),getRowSet(cx,cy),getColSet(cx,cy)]);
}

var isValid = function(change)
{
	var cx = change.x, cy = change.y, v = change.value;
	//check to see if cell has been changed before, indicating that it is not a hint
	
	if(getSector(cx,cy).includes(v))
		return false;
	return true;
}

var isHint = function(cx,cy)
{
	if(grid[cx][cy]===0)
		return false;
	for(var i=0; i<hist.length; i++)
	{
		var x = hist[i];
		if(x.x==cx&&x.y==cy)
			return false;
	}
	return true;
}

var proposeChange = function(cx,cy,v)
{
	var change = getChange(cx,cy,v);
	if(!isHint(cx,cy)){
		if(!isValid(change))
		{
	      if(deepFind({x:cx,y:cy,value:v},wrong)===-1)
		    wrong.push(change)
		}
	    else
		{
			//remove any existing errors
			var ind =  deepFind({x:cx,y:cy,value:grid[cx][cy]},wrong);
			if(ind>=0)
				wrong.splice(ind,1);
		}
		hist.push(change);
		grid[cx][cy] = v;
		update();
		//check if puzzle completed
		if(checkComplete())
		{
			alert('congrats bud');
		}
		return true;
	}
	return false;
}

var checkComplete = function()
{
	for(var i=0; i<9; i++)
		for(var j=0; j<9; j++)
			if(grid[i][j]==0||getSector(i,j).includes(grid[i][j]))
				return false;
	return true;
}

var deepFind = function(obj,list)
{
	var ind = -1;
	for(var i=0; i<list.length; i++)
		if(deepEquals(obj,list[i]))
			ind = i;
	return ind;
}

var update = function(){
	var table = document.getElementsByTagName("table")[0];
	if(!document.body.contains(table))
		table = createTable();
	
	var row = 0;
	for (var i = 0; i < 11; i++) {
        var tr = table.childNodes[i];
		if(tr.className.toLowerCase()=="hspacer")
				continue;
		var col = 0;
        for (var j = 0; j < 11; j++) {
            var td = tr.childNodes[j];
			//skip spacers
			if(td.className.toLowerCase()=="vspacer")
				continue;
			
			//highlight selected cell and clear all others
			td.removeAttribute("id");
			if(row==xCur&&col==yCur)
				td.id = "selection";
			else if(deepFind(getChange(row,col,grid[row][col]),wrong)>=0)
				td.id = "wrong";

			//remove previous number and put in input, if any
			var textNode = td.firstChild;
			if(!td.className.startsWith("hint"))
			{
				td.removeChild(textNode);
				//put new number in cell
				textNode = document.createTextNode(grid[row][col]===0?"":grid[row][col].toString());
				td.className = "guess x"+row+" y"+col;
				td.appendChild(textNode);
			}
			
			col++;
        }
		
		row++;
    }
}

//creation and initialization
var createTable = function()
{
    var table = document.createElement("table");
    for (var i = 0; i < 9; i++) {
        var tr = document.createElement('tr');
        for (var j = 0; j < 9; j++) {
            var td = document.createElement('td');
			//put number in cell if not 0
			var textNode = document.createTextNode(grid[i][j]===0?"":grid[i][j].toString());
			if(grid[i][j]!=0)
				td.className = "hint x"+i+" y"+j;
			td.appendChild(textNode);
            tr.appendChild(td);
			if(j%3==2&&j!=8)
			{
				var s = document.createElement('td');
				s.className = "vspacer";
				tr.appendChild(s);
			}
        }
        table.appendChild(tr);
		if(i%3==2&&i!=8)
		{
			var s = document.createElement('tr');
			s.className = "hspacer";
			table.appendChild(s);
		}
    }
    document.body.appendChild(table);
	return table;
}

var select = function(cx,cy)
{
	xCur=cx; yCur = cy;
}

var deepEquals = function(a, b) {
    return a.value==b.value&&a.x==b.x&&a.y==b.y;
}
