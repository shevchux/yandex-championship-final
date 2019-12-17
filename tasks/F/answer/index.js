let visited, notVisited, marks, toDist;

const result = [];

let map, height, width, fromX, fromY, toX, toY;

function calcMark(j, i, v) {
  if (j >= 0 && j < height && i >= 0 && i < width && !visited[j][i]) {
    marks[j][i] = Math.min(marks[j][i], v);
  }
}

function pathFinder(input) {
  /* parse */
  const [rawFrom, rawTo, ...rawMap] = input.split('\n');
  map = rawMap.map(line => line.trim().split('').map(Number));

  const [rawFromX, rawFromY] = rawFrom.split(':');
  fromX = Number(rawFromX);
  fromY = Number(rawFromY);

  const [rawToX, rawToY] = rawTo.split(':');
  toX = Number(rawToX);
  toY = Number(rawToY);

  height = map.length;
  width = map[0].length;
  
  /* deikstra */
  visited = new Array(height).fill(0).map(_ => new Array(width).fill(false));
  notVisited = height * width;
  
  marks = new Array(height).fill(0).map(_ => new Array(width).fill(Infinity));
  marks[fromY][fromX] = 0;

  while (true) {
    let minMarkValue = Infinity;
    let y, x;

    for (let j = 0; j < height; j++) {
      for (let i = 0; i < width; i++) {
        if (!visited[j][i] && marks[j][i] < minMarkValue) {
          minMarkValue = marks[j][i];
          y = j; x = i;
        }
      }
    }

    if (minMarkValue === Infinity) break;
    visited[y][x] = true;

    const newMark = minMarkValue + 1;

    for (let i = 1; i <= map[y][x]; i++) {
      calcMark(y - i, x, newMark);
      calcMark(y + i, x, newMark);
      calcMark(y, x - i, newMark);
      calcMark(y, x + i, newMark);
    }
  }

  toDist = marks[toY][toX];

  if (toDist !== Infinity) {
    find(fromX, fromY, 1);
  }

  return result;
}

function check(j, i, currDist) {
  if (j >= 0 && j < height && i >= 0 && i < width && marks[j][i] === currDist) {
    find(i, j, currDist + 1);
  }
}

const currentPath = [];

function find(x, y, currDist) {
  currentPath.push(`${x}:${y}`);

  if (currDist < toDist) {
    for (let i = 1; i <= map[y][x]; i++) {
      check(y - i, x, currDist);
      check(y + i, x, currDist);
      check(y, x - i, currDist);
      check(y, x + i, currDist);
    }
  } else {
    for (let i = 1; i <= map[y][x]; i++) {
      if (
        y - i === toY && x === toX ||
        y + i === toY && x === toX ||
        y === toY && x - i === toX ||
        y === toY && x + i === toX
      ) {
        result.push(currentPath.concat(`${toX}:${toY}`));
        break;
      }
    }
  }

  currentPath.pop();
}

const input0 = `2:3  
4:4  
00014  
30020  
00000  
70100  
11100`; // output [["2:3","2:4","1:4","0:4","0:3","0:1","3:1","3:0","4:0","4:4"]]

const input1 = `0:2  
8:7  
0515320501  
3150514510  
0102010523  
5510001000  
1402152200  
0310530201  
0551451213  
4101452055  
0252411510  
4110045253`; // output []

const input2 = `2:3  
3:0  
2012  
3001  
7000  
1920`; // output [["2:3","0:3","0:2","0:0","2:0","3:0"],["2:3","0:3","0:2","0:1","3:1","3:0"]]

const input3 = `0:2  
18:7  
051532050105153205010515320501  
315051451031505145103150514510  
010201052301020105230102010523  
551000100055100010005510001000  
140215220014021522001402152200  
031053020103105302010310530201  
055145121305514512130551451213  
410145205541014520554101452055  
025241151002524115100252411510  
411004525341100452534110045253`; // output []

console.log(pathFinder(input2));