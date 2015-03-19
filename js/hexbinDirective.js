var app = angular.module('Beer-App');

app.directive('hexbin', function() {
    return {
        restrict: 'E',
        link: function(scope, element) {

            var width = 2400;
            var height = 575;

            // var color = d3.scale.linear()
            //     .domain([0, 20])
            //     .range(["orange", "orange"])
            //     .interpolate(d3.interpolateLab);

            var hexbin = d3.hexbin()
                .size([width, height])
                .radius(80);

            var svg = d3.select("hexbin").append("svg")
                .attr("width", width)
                .attr("height", height);

            var points = hexbin.centers();

            // var x = d3.scale.identity()
            //     .domain([0, width]);

            // var y = d3.scale.linear()
            //     .domain([0, height])
            //     .range([height, 0]);



            // svg.append("clipPath")
            //     .attr("id", "clip")
            //     .append("rect")
            //     .attr("class", "mesh")
            //     .attr("width", width)
            //     .attr("height", height);

            svg.append("g")
                .selectAll(".hexagon")
                .data(hexbin(points))
                .enter().append('a')
                
                // .attr('href', 'http://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/2000px-Tux.svg.png')
                .append("path")
                .attr("class", "hexagon")
                // .append('image')
                // .style('xlink:href' : 'http://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/2000px-Tux.svg.png', 'height="50px" width="50px"')
                .style({'src': "http://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/2000px-Tux.svg.png", 'height': "50px", 'width': "50px"})
                


            .attr("d", hexbin.hexagon())
                .attr("transform", function(d) {
                    return "translate(" + d.x + "," + d.y + ")";
                });
                
        },



    };
});
