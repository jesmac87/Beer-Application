var canvas = d3.select('.canvas')
    .append('svg')
    .attr('width', 500)
    .attr('height', 500);

var circle = d3.select('.labels')
    .attr('cx', 250)
    .attr('cy', 250)
    .attr('r', 50)
    .attr('fill', 'red');
