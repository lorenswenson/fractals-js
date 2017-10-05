
function calcPixel(row,col,rows,cols){
    var x0 = 3.5*(col/cols)-2.5;
    var y0 = 2*(row/rows)-1;
    var x = 0.0;
    var y = 0.0;
    var iteration = 0;
    var maxIteration = 1000;
    while (x*x + y*y < 4 && iteration < maxIteration){
        var xtemp = x*x - y*y + x0;
        var y = 2*x*y + y0;
        var x = xtemp;
        iteration += 1;
    }
    return iteration
}

function calcSet(rows,cols){
    var z = [];
    for (n=0;  n<rows; n++){
        columns = [];
        for (m=0; m<cols; m++){
            columns[m] = calcPixel(n, m, rows, cols);
        }
        z[n] = columns;
    }
    return z;
}


function iota (n) {
    var ar = [];
    for (s = 0; s < n; s++){
        ar[s] = s;
    }
    return ar;
}

function axisTemplate(span){
    return {range: [0, span],
            autorange: false,
            showgrid: false,
            zeroline: false,
            showticklabels: false,
            ticks: ''
           }
}

function plotData (rows, cols) {
    var xs = iota(cols);
    var ys = iota(rows);

    var hm = {
        x: xs,
        y: ys,
        z: calcSet(rows, cols),
        type: 'heatmap',
        showscale: false,
        colorscale: 'viridis'
    };

    var layout = {
        margin: {
            t: 100,
            r: 100,
            b: 100,
            l: 100
        },
        xaxis: axisTemplate(cols),
        yaxis: axisTemplate(rows),
        showlegend: false,
        width: 800,
        height: 800*(rows/cols),
        autosize: false,
        paper_bgcolor: 'rgba(0, 0, 0, 0)'
        /*          plot_bgcolor: 'rgba(0,0,0,0)'*/
    };

    
    var data = [hm];
    
    mandelbrot = document.getElementById('mandelbrot');
    Plotly.plot( mandelbrot, data, layout);
    console.log("loaded" );
}
