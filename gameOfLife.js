
var ctx = document.getElementById('canvas').getContext("2d");
var bw = 800, bh = 600; // 画布宽、高
var d = 15; // 格子大小

function randomColor() {
	return "#"+(Math.round((1<<24)*Math.random())).toString(16);
}

function initBoard() {
	// 初始化格子
	for(var x = 0; x<=bw; x+=d) {
		ctx.moveTo(x, 0);
		ctx.lineTo(x, bh);
	}
	for(var y = 0; y<=bh; y+=d) {
		ctx.moveTo(0, y);
		ctx.lineTo(bw, y);
	}
}

function drawBoard(board, m, n) {
	// 绘制格子
	for(var i=0; i < m; ++i) {
		for(var j = 0; j < n; ++j) {
			ctx.fillStyle = randomColor();
			if(board[i][j] & 0x1)
				ctx.fillRect(i*d, j*d, d, d);
			else
				ctx.clearRect(i*d, j*d, d, d);
		}
	}
	ctx.stroke();
}

function getNeighbors(board, x, y, m, n) {
	var cnt = 0;
	for(var i=x-1; i<=x+1; ++i)
		for(var j=y-1; j<=y+1; ++j)
			if(i>=0 && j>=0 && i<m && j<n) {
				if((i != x || j != y)) cnt += board[i][j] & 0x1;
			}
	return cnt;
}

function gameOfLife(board, m, n) {
	for (var i = 0; i < m; ++i)
		for (var j = 0; j < n; ++j) {
			var nebs = getNeighbors(board, i, j, m, n);
			console.log("("+i+", "+j + "): " + nebs);
			if(nebs == 2) board[i][j] |= (board[i][j] & 0x1) << 1; // 保持不变
			else if(nebs == 3) board[i][j] |= 0x2; // 增生
			else board[i][j] &= 0x1; // 死亡
		}
	console.log("\n");

	for (var i = 0; i < m; ++i)
		for (var j = 0; j < n; ++j)
			board[i][j] >>= 1;
}


function run() {
	// 初始化数组
	if(typeof run.init == 'undefined') {
		board = [];
		m = parseInt(bw/d);
		n = parseInt(bh/d);
		for(var i = 0; i < m; ++i) {
			board[i] = [];
			for(var j = 0; j < n; ++j)
				board[i][j] = Math.round(Math.random());
				// board[i][j] = 0;
		}
		// board[5][5] = 1;
		// board[6][5] = 1;
		// board[6][4] = 1;
		// board[7][5] = 1;
		initBoard();
		run.init = true;
	}

	gameOfLife(board, m, n);
	drawBoard(board, m, n);
}

setInterval("run()", 500);

