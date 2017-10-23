
function calcPixel(x0, y0, maxIterations){
    // Calculate how many interations are required to exceed maxIterations
    // Proxy for 
    var x = 0.0;
    var y = 0.0;
    var iteration = 0;
    while (x*x + y*y < 4 && iteration < maxIterations){
        var xtemp = x*x - y*y + x0;
        y = 2*x*y + y0;
        x = xtemp;
        iteration += 1;
    }
    return iteration;
}

// Try using math.js --> seems slow in this case.
// function calcPixel2(x0, y0, maxIterations){
//     // Version of calcPixel using math library.
//     var c0 = math.complex(x0, y0);
//     var m = function (z){
//         var temp = z.mul(z);
//         return temp.add(c0);
//     };
//     var z = m(math.complex(0,0));
//     var iteration = 1;
//     while (z.abs() < 2 && iteration < maxIterations){
//         z = m(z);
//         iteration += 1;
//     }
//     return iteration;
// }

function calcSet(xs, ys, maxIterations){
    var z = [];
    for (row=0;  row<ys.length; row++){
        columns = [];
        for (col=0; col<xs.length; col++){
            columns[col] = calcPixel(xs[col], ys[row], maxIterations);
        }
        z[row] = columns;
    }
    return z;
}

var nTraces = 0;

function plotData (xstart, xstop, cols, ystart, ystop, rows) {
    var xs = numeric.linspace(Math.min(xstart, xstop),
                              Math.max(xstart, xstop), cols);
    var ys = numeric.linspace(Math.min(ystart, ystop),
                              Math.max(ystart, ystop),rows);
    var maxIterations = 1000;
    
    var hm = {
        x: xs,
        y: ys,
        z: calcSet(xs, ys, maxIterations),
        type: 'heatmap',
        showscale: false,
        colorscale: 'Portland'
    };

    var layout = {
        margin: {
            t: 100,
            r: 100,
            b: 100,
            l: 100
        },
        xaxis: {range: [ys[0], ys[ys.length-1]],
                autorange: true,
                showgrid: false,
                zeroline: false,
                showticklabels: true,
                ticks: 'outside'
               },
        yaxis: {range: [xs[0], xs[xs.length-1]],
                autorange: true,
                scaleanchor: "x",
                showgrid: false,
                zeroline: false,
                showticklabels: true,
                ticks: 'outside'
               },
        showlegend: false,
        width: 800,
        height: 800*(rows/cols),
        autosize: true,
        paper_bgcolor: 'rgba(0, 0, 0, 0)'
        /*          plot_bgcolor: 'rgba(0,0,0,0)'*/
    };

    
    var data = [hm];



    if (nTraces == 1) {
        Plotly.deleteTraces(mandelbrot, 0);
        nTraces = 0;
    }
    

    Plotly.plot(mandelbrot, data, layout);
    nTraces += 1;
}

function myOnload(){
    var mandelbrot = document.getElementById('mandelbrot');
    var cols = 450;
    var rows = 450;
    plotData(-2, 2, cols, -2, 2, rows);
    mandelbrot.on('plotly_relayout',
                  function(eventdata){
                      if ((typeof eventdata['xaxis.range[0]'] != 'undefined') &&
                          (typeof eventdata['xaxis.range[1]'] != 'undefined') &&
                          (typeof eventdata['yaxis.range[0]'] != 'undefined') &&
                          (typeof eventdata['yaxis.range[1]'] != 'undefined')){
                          plotData(eventdata['xaxis.range[0]'], eventdata['xaxis.range[1]'], cols,
                                   eventdata['yaxis.range[0]'], eventdata['yaxis.range[1]'], rows);
                      }
                  });
}

