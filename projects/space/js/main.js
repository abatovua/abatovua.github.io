HTMLElement.prototype.getOffset = function() {
    var offset = null;
    self = this;
    if (self) {
        offset = {left: 0, top: 0};
        do {
            offset.top += self.offsetTop;
            offset.left += self.offsetLeft;
            self = self.offsetParent;
        } while (self);
    }
    return offset;
}; 

initLineChart();
initBarChart();
initProgressBar();
initRadarChart('.radarchart-select--box', '.radar-chart--box', 500, 1000);


function initBarChart() {
  var barData = [
                  [4, 6, 8, 5, 3, 4, 9, 7, 5, 10, 6, 7, 5],
                  [8, 3, 7, 5, 6, 6, 7, 9, 4, 10, 5, 4, 5],
                  [5, 7, 10, 9, 7, 6, 4, 5, 4, 5, 6, 3, 8],
                  [6, 9, 10, 3, 6, 7, 4, 5, 5, 8, 4, 7, 5],
                  [5, 7, 8, 6, 4, 5, 7, 9, 10, 5, 3, 6, 4],
                  [9, 5, 10, 4, 3, 6, 4, 7, 5, 6, 5, 7, 8]
                ];
  var bars = document.querySelectorAll('.bar');
  var titles = document.querySelectorAll('.bar-title');
  var arrays = document.querySelectorAll('.bar-array');
  var MAX_BAR_HEIGHT = 380; // equals 10
  

  //data mapping function
  function mapBarData(d) {
    return d.map(function(value){
      return (value / 10) * MAX_BAR_HEIGHT;});
  }

  // click events
  var barChartSelect = document.querySelector('.barchart-select');
  
  barChartSelect.addEventListener('click', function(event) {
    event.stopPropagation();
    this.parentElement.classList.add('active');
  });
 
  var barChartOptions = document.querySelector('.barchart-options');
  
  barChartOptions.addEventListener('click', function(event) {
    event.stopPropagation();
    var currentOption = event.target;
    var month = currentOption.textContent;
    var label = month.slice(0, 3);
    var order = currentOption.getAttribute('data-order');
    var currentMonthData = mapBarData(barData[order]);
    var startDay = 1;
    barChartSelect.textContent = month;
    this.parentElement.classList.remove('active');
    
    for(var j = 0; j < titles.length; j++) {
      titles[j].textContent = label + ' ' + startDay;
      startDay += 2;
    }

    for(var k = 0; k < bars.length; k++) {
      bars[k].style.height = currentMonthData[k] + 'px';
      arrays[k].style.height = (MAX_BAR_HEIGHT - currentMonthData[k]) + 'px';
    }
  });

  //scroll event
  var selectBoxOffset = document.querySelector('.barchart-select--box').getOffset().top;
  
  var barChartScrollHandler = function() {
    var wScroll = window.pageYOffset;
    if(wScroll >= selectBoxOffset - 200) {
      var startData = mapBarData(barData[0]);
      for(var n = 0; n < bars.length; n++) {
        bars[n].style.height = startData[n] + 'px';
        arrays[n].style.height = (MAX_BAR_HEIGHT - startData[n]) + 'px';
      }
      window.removeEventListener('scroll', barChartScrollHandler);
    }
  };

  window.addEventListener('scroll', barChartScrollHandler);
}


function initLineChart() {
	//append main linechart
  var lineData = [
  		{'x': 0,'y': 111}, 
  		{'x': 398,'y': 111}, 
  		{'x': 450,'y': 108}, 
  		{'x': 473,'y': 112}, 
  		{'x': 506,'y': 124}, 
  		{'x': 537,'y': 131}, 
  		{'x': 562, 'y': 122}, 
  		{'x': 591, 'y': 100}, 
  		{'x': 612, 'y': 92}, 
  		{'x': 637, 'y': 99}, 
  		{'x': 655, 'y': 118}, 
  		{'x': 666, 'y': 126}, 
  		{'x': 682, 'y': 117}, 
  		{'x': 699, 'y': 92}, 
  		{'x': 713, 'y': 82}, 
  		{'x': 729, 'y': 92}, 
  		{'x': 777, 'y': 150}, 
  		{'x': 792, 'y': 160},
  		{'x': 803, 'y': 150}, 
  		{'x': 829, 'y': 95}, 
  		{'x': 840, 'y': 86}, 
  		{'x': 855, 'y': 95}, 
  		{'x': 873, 'y': 108}, 
  		{'x': 888, 'y': 113}, 
  		{'x': 907, 'y': 118}, 
  		{'x': 927, 'y': 113}, 
  		{'x': 947, 'y': 98}, 
  		{'x': 963, 'y': 94},
  		{'x': 984, 'y': 100}, 
  		{'x': 1002, 'y': 108}, 
  		{'x': 1016, 'y': 113}, 
  		{'x': 1032, 'y': 116}, 
  		{'x': 1056, 'y': 117}, 
  		{'x': 1076, 'y': 113}, 
  		{'x': 1092, 'y': 111},
  		{'x': 1150, 'y': 111}
  	];

  var timeline = d3.select("#timelineBox");
  var lineFunc = d3.svg.line()
  .x(function (d) {
    return d.x;
  })
  .y(function (d) {
    return d.y;
  })
  .interpolate('basis');

  var path = timeline.append("svg:path")
    .attr("d", lineFunc(lineData))
    .attr("stroke-width", 1.5)
    .attr("fill", "none")
    .attr("stroke", "url(#grad1)")
    .attr('stroke-dasharray', '1266.5 1266.5')
    .attr('stroke-dashoffset', '1266.5');

  // append events lines
  function initEventLines(sx, sy, ex, ey) {
    timeline.append("svg:line")
      .attr("x1", sx)
      .attr("y1", sy)
      .attr("x2", ex)
      .attr("y2", ey)
      .attr("stroke", "#616168")
      .attr("stroke-width", 2);
  }

  initEventLines(67, 111, 67, 0);
  initEventLines(83, 111, 83, 221);
  initEventLines(282, 111, 282, 221);
  initEventLines(613, 93, 613, 221);
  initEventLines(876, 109, 876, 0);
  
  var eventLines = d3.selectAll('#timelineBox line');
  
  eventLines.each(function(d, i) {
    var currentLine = d3.select(this);
    var totalLength = Math.abs(+currentLine.attr('y1') - +currentLine.attr('y2'));
    
    currentLine
      .attr('stroke-dasharray', totalLength + ' ' + totalLength)
      .attr('stroke-dashoffset', totalLength);
  });

  
//append breakpoints
  function initBreakpoints(x, y, color) {
    timeline.append("svg:circle")
      .attr("cx", x)
      .attr("cy", y)
      .attr("r", "3")
      .attr("stroke", "#252528")
      .attr("stroke-width", "1")
      .attr("fill", color);
  }

  initBreakpoints(67, 111, '#29e9cc');
  initBreakpoints(83, 111, '#29e9cc');
  initBreakpoints(207, 111, '#29e9cc');
  initBreakpoints(215, 111, '#29e9cc');
  initBreakpoints(282, 111, '#29e9cc');
  initBreakpoints(393, 110, '#5fbad2');
  initBreakpoints(613, 95, '#928fd8');
  initBreakpoints(792, 157, '#ba6fdc');
  initBreakpoints(876, 109, '#cc5ede');
  initBreakpoints(988, 102, '#e14bdf');

  // scroll animation
  var timelineOffset = document.querySelector('.timeline-wrap').getOffset().top;
  var textCells = d3.selectAll('#timelineBox text');

  var lineChartScrollHandler = function() {
    var wScroll = window.pageYOffset;
    if(wScroll >= timelineOffset - 500) {
      path
        .transition()
        .duration(2000)
        .attr('stroke-dashoffset', '0');
      
      eventLines.each(function(d, i) {
        var currentLine = d3.select(this);     
        currentLine
          .transition()
          .duration(2000)
          .attr('stroke-dashoffset', '0');
      });
      
      textCells.each(function(d, i) {
        var currentText = d3.select(this);
        currentText
          .transition()
          .duration(1500)
          .delay(1500)
          .style('opacity', '1');
      });

      window.removeEventListener('scroll', lineChartScrollHandler);
    }
  };

  window.addEventListener('scroll', lineChartScrollHandler);
}

function initProgressBar() {
  var progressBarData = [9, 3, 1.5, 2]; // from 0 to 10 only
  var anchor = document.querySelector('.overview p').getOffset().top;
  var masks = document.querySelectorAll('.mask');
  //scroll animation
  var progressBarScrollHandler = function() {
    var wScroll = window.pageYOffset;
    if(wScroll >= anchor - 500) {
      for(var i = 0; i < masks.length; i++) {
        masks[i].style.width = (10 - progressBarData[i]) / 10 * 100 + '%';
      }
      window.removeEventListener('scroll', progressBarScrollHandler);
    }
  };
  
  window.addEventListener('scroll', progressBarScrollHandler);
}


function initRadarChart(selectContainer, svgContainer, width, dur) {
  //We can get dataSet from server or user. In this case I put it directly, assuming its format like this.
  var dataSet = 
  [
    {
      'setName': 'Characteristics',
      'setData': {
                  'weight': '8',
                  'economy': '2.5',
                  'landing': '4.8',
                  'software': '7',
                  'height': '7',
                  'balance': '2',
                  'capacity': '7',
                  'load': '3'
                 } 
    },
    {
      'setName': 'Animals',
      'setData': {
                  'seal': '2',
                  'whale': '9',
                  'jaguar': '4',
                  'lion': '7.5',
                  'dog': '3.5',
                  'mouse': '1',
                  'bird': '2',
                  'tiger': '7.5'
                 } 
    },
    {
      'setName': 'Planets',
      'setData': {
                  'venus': '3',
                  'earth': '5',
                  'jupiter': '9',
                  'saturn': '8',
                  'uranus': '7',
                  'pluto': '1',
                  'mars': '3',
                  'neptune': '7.5'
                 } 
    },
    {
      'setName': 'Awesomeness',
      'setData': {
                  'good': '5',
                  'kind': '3',
                  'awesome': '10',
                  'cool': '7',
                  'stunning': '8',
                  'heartbreaking': '1',
                  'chill': '3',
                  'warm': '6'
                 } 
    },
    {
      'setName': 'Random Data',
      'setData': {
                  'chicken': '8.4',
                  'table': '3.7',
                  'skirt': '6.5',
                  'wow': '9.8',
                  'disgusting': '3',
                  'sofa': '6.7',
                  'aligator': '5.2',
                  'obama': '4.4'
                 } 
    }
  ];

  var axisRanges = {
    'minX': width / 2,
    'minY': width / 2,
    'N': {
            'maxX': width / 2,
            'maxY': width * 0.15
         },

    'NE': {
            'maxX': width * 0.7479,
            'maxY': width * 0.2521
          },

    'E': {
            'maxX': width * 0.85,
            'maxY': width / 2
         },

    'SE': {
            'maxX': width * 0.7479,
            'maxY': width * 0.7479
          },

    'S': {
            'maxX': width / 2,
            'maxY': width * 0.85
          },

    'SW': {
            'maxX': width * 0.2521,
            'maxY': width * 0.7479
          },

    'W': {
            'maxX': width * 0.15,
            'maxY': width / 2
          },

    'NW': {
            'maxX': width * 0.2521,
            'maxY': width * 0.2521
          }
  }
  //working with select
  var selectCont = d3.select(selectContainer);
  var selectMain = selectCont.append('div')
    .attr('class', 'radarchart-select')
    .html(dataSet[0].setName);
  var selectOptions = selectCont.append('ul')
    .attr('class', 'radarchart-options');
  for (var optNum = 0; optNum < dataSet.length; optNum++) {
    selectOptions.append('li')
      .attr('class', 'radarchart-option')
      .attr('data-order', optNum)
      .html(dataSet[optNum].setName);
  }
  //append svg
  var svgCont = d3.select(svgContainer);
  var chart = svgCont.append('svg')
    .attr('viewBox', '0 0 ' + width + ' ' + width)
    .attr('class', 'radar-chart svg-resp')
  //append net
  chart.append('svg:circle')//outer circle
    .attr('cx', width / 2)
    .attr('cy', width / 2)
    .attr('r', width * 0.7 / 2)
    .attr('fill', 'none')
    .attr('stroke', '#cacace')
    .attr('stroke-width', 1);
  chart.append('svg:circle')//2nd circle
    .attr('cx', width / 2)
    .attr('cy', width / 2)
    .attr('r', width * 0.7 * 0.75 / 2)
    .attr('fill', 'none')
    .attr('stroke', '#cacace')
    .attr('stroke-width', 1);
  chart.append('svg:circle')//third circle
    .attr('cx', width / 2)
    .attr('cy', width / 2)
    .attr('r', width * 0.7 * 0.5 / 2)
    .attr('fill', 'none')
    .attr('stroke', '#cacace')
    .attr('stroke-width', 1);
  chart.append('svg:circle')//inner circle
    .attr('cx', width / 2)
    .attr('cy', width / 2)
    .attr('r', width * 0.7 * 0.25 / 2)
    .attr('fill', 'none')
    .attr('stroke', '#cacace')
    .attr('stroke-width', 1);
  chart.append('svg:line')//N+S axis
    .attr("x1", width / 2)
    .attr("y1", width * 0.15)
    .attr("x2", width / 2)
    .attr("y2", width * 0.85)
    .attr("stroke", "#cacace")
    .attr("stroke-width", 1);
  chart.append('svg:line')//W+E axis
    .attr("x1", width * 0.15)
    .attr("y1", width / 2)
    .attr("x2", width * 0.85)
    .attr("y2", width / 2)
    .attr("stroke", "#cacace")
    .attr("stroke-width", 1);
  chart.append('svg:line')//NW+SE axis
    .attr("x1", width * 0.2521)
    .attr("y1", width * 0.2521)
    .attr("x2", width * 0.7479)
    .attr("y2", width * 0.7479)
    .attr("stroke", "#cacace")
    .attr("stroke-width", 1);
  chart.append('svg:line')//NE+SW axis
    .attr("x1", width * 0.7479)
    .attr("y1", width * 0.2521)
    .attr("x2", width * 0.2521)
    .attr("y2", width * 0.7479)
    .attr("stroke", "#cacace")
    .attr("stroke-width", 1);
  //appending labels
  chart.append('svg:text')
    .attr('x', axisRanges.minX)
    .attr('y', axisRanges.N.maxY - 10)
    .attr('text-anchor', 'middle');
  chart.append('svg:text')
    .attr('x', axisRanges.NE.maxX + 10)
    .attr('y', axisRanges.NE.maxY - 10)
    .attr('text-anchor', 'start');
  chart.append('svg:text')
    .attr('x', axisRanges.E.maxX + 10)
    .attr('y', axisRanges.minY - 10)
    .attr('text-anchor', 'start');
  chart.append('svg:text')
    .attr('x', axisRanges.SE.maxX + 10)
    .attr('y', axisRanges.SE.maxY + 10)
    .attr('text-anchor', 'start');
  chart.append('svg:text')
    .attr('x', axisRanges.minX)
    .attr('y', axisRanges.S.maxY + 15)
    .attr('text-anchor', 'middle');
  chart.append('svg:text')
    .attr('x', axisRanges.SW.maxX - 10)
    .attr('y', axisRanges.SW.maxY + 10)
    .attr('text-anchor', 'end');
  chart.append('svg:text')
    .attr('x', axisRanges.W.maxX - 10)
    .attr('y', axisRanges.minY)
    .attr('text-anchor', 'end');
  chart.append('svg:text')
    .attr('x', axisRanges.NW.maxX - 10)
    .attr('y', axisRanges.NW.maxY - 10)
    .attr('text-anchor', 'end');
  //appending linear gradient
  var gradient = chart.append('svg:defs').append("svg:linearGradient")  
    .attr("id", "radarChartGradient")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "0%")
    .attr("y2", "100%");
  gradient.append('svg:stop')
    .attr("offset", "0%")
    .attr("stop-color", "rgb(202, 26, 172)")
    .attr("stop-opacity", 1)
  gradient.append('svg:stop')
    .attr("offset", "100%")
    .attr("stop-color", "rgb(58, 75, 210)")
    .attr("stop-opacity", 1);
  //first load path to be changed when selected another dataset
  var d0 = 'M' + (axisRanges.minX) + ' ' + (axisRanges.minY - 1) + 
      ' L' + (axisRanges.minX + 1) + ' ' + (axisRanges.minY - 1) + 
      ' L' + (axisRanges.minX + 1) + ' ' + (axisRanges.minY) +
      ' L' + (axisRanges.minX + 1) + ' ' + (axisRanges.minY + 1) + 
      ' L' + (axisRanges.minX) + ' ' + (axisRanges.minY + 1) +
      ' L' + (axisRanges.minX - 1) + ' ' + (axisRanges.minY + 1) +
      ' L' + (axisRanges.minX - 1) + ' ' + (axisRanges.minY) +
      ' L' + (axisRanges.minX - 1) + ' ' + (axisRanges.minY - 1) + ' Z';
  //next path transition to
  var d1;
  //append path
  var workPath = chart.append('svg:path')
    .attr('fill', 'url(#radarChartGradient)')
    .attr('opacity', 0.85)
    .attr('d', d0);
 


  function makePathString(data) {
    var output = []; //pathString [0], labels is an array on [1], daraSet name [2]
    output[1] = [];
    output[2] = data.setName;
    var coords = [];
    for(var key in data.setData) {
      output[1].push(key);
      coords.push(+data.setData[key]);
    }
    var Ncoord = 'M' + axisRanges.N.maxX + ' ' + (axisRanges.minY - (axisRanges.minY - axisRanges.N.maxY) * coords[0] / 10) + ' ';
    var NEcoord = 'L' + (axisRanges.minX + (axisRanges.NE.maxX - axisRanges.minX) * coords[1] / 10) + ' ' + (axisRanges.minY - (axisRanges.minY - axisRanges.NE.maxY) * coords[1] / 10) + ' ';
    var Ecoord = 'L' + (axisRanges.minX + (axisRanges.E.maxX - axisRanges.minX) * coords[2] / 10) + ' ' + axisRanges.minY + ' ';
    var SEcoord = 'L' + (axisRanges.minX + (axisRanges.SE.maxX - axisRanges.minX) * coords[3] / 10) + ' ' + (axisRanges.minY + (axisRanges.SE.maxY - axisRanges.minY) * coords[3] / 10) + ' ';
    var Scoord = 'L' + axisRanges.minX + ' ' + (axisRanges.minY + (axisRanges.S.maxY - axisRanges.minY) * coords[4] / 10) + ' ';
    var SWcoord = 'L' + (axisRanges.minX - (axisRanges.minX - axisRanges.SW.maxX) * coords[5] / 10) + ' ' + (axisRanges.minY + (axisRanges.SW.maxY - axisRanges.minY) * coords[5] / 10) + ' ';
    var Wcoord = 'L' + (axisRanges.minX - (axisRanges.minX - axisRanges.W.maxX) * coords[6] / 10) + ' ' + axisRanges.minY + ' ';
    var NWcoord = 'L' + (axisRanges.minX - (axisRanges.minX - axisRanges.NW.maxX) * coords[7] / 10) + ' ' + (axisRanges.minY - (axisRanges.minY - axisRanges.NW.maxY) * coords[7] / 10) + ' Z';
    
    output[0] = Ncoord + NEcoord + Ecoord + SEcoord + Scoord + SWcoord + Wcoord + NWcoord;
        
    return output;
  }

  function transition(path, d0, d1) {
    path.transition()
      .duration(dur)
      .attrTween("d", pathTween(d1, 4));
  }
  
  function pathTween(d1, precision) {
    return function() {
      var path0 = this,
          path1 = path0.cloneNode(),
          n0 = path0.getTotalLength(),
          n1 = (path1.setAttribute("d", d1), path1).getTotalLength();
      // Uniform sampling of distance based on specified precision.
      var distances = [0], i = 0, dt = precision / Math.max(n0, n1);
      while ((i += dt) < 1) distances.push(i);
      distances.push(1);
      // Compute point-interpolators at each distance.
      var points = distances.map(function(t) {
        var p0 = path0.getPointAtLength(t * n0),
            p1 = path1.getPointAtLength(t * n1);
        return d3.interpolate([p0.x, p0.y], [p1.x, p1.y]);
      });
      return function(t) {
        return t < 1 ? "M" + points.map(function(p) { return p(t); }).join("L") : d1;
      };
    };
  }
  
  //EVENTS
  //click events
  var radarTextLabels = document.querySelectorAll('.radar-chart text');
  var radarChartOffset = document.querySelector('.radar-wrapper').getOffset().top;
  var radarChartSelect = document.querySelector('.radarchart-select');
  var radarChartOptions = document.querySelector('.radarchart-options');

  radarChartSelect.addEventListener('click', function(event) {
    event.stopPropagation();
    document.querySelector(selectContainer).classList.add('active');
  });

  radarChartOptions.addEventListener('click', function(event){
    event.stopPropagation();
    var currentOption = event.target;
    var order = currentOption.getAttribute('data-order');
    var localData = makePathString(dataSet[order]);
    var lbls = localData[1];
    var localDataName = localData[2];
    d0 = workPath.attr('d');
    d1 = localData[0];
    document.querySelector(selectContainer).classList.remove('active');
    radarChartSelect.textContent = localDataName;
    for(var l = 0; l < lbls.length; l++) {
      radarTextLabels[l].textContent = lbls[l].toUpperCase();
    }
    transition(workPath, d0, d1);
  });

  
  //scroll events
  var radarChartScrollHandler = function() {
    var wScroll = window.pageYOffset;
    if(wScroll >= radarChartOffset - 500) {
      var localData = makePathString(dataSet[0]);
      var lbls = localData[1];
      d1 = localData[0];
      for(var l = 0; l < lbls.length; l++) {
        radarTextLabels[l].textContent = lbls[l].toUpperCase();
      }
      
      transition(workPath, d0, d1);
      window.removeEventListener('scroll', radarChartScrollHandler);
    }
  };
  
  window.addEventListener('scroll', radarChartScrollHandler);
}
