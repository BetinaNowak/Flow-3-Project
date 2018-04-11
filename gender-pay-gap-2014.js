// JavaScript Document

var w = 600;
var h = 500;
var m = 200;

// creating the SVG and defining the scales for our bar chart
var svg = d3.select("#bar-chart")
		.append("svg")
		.attr("width", w) // width of the entire svg graphic
		.attr("height", h),       
        width = w - m,
        height = h - m;

var xScale = d3.scaleBand().range ([0, width]).padding(0.4),
	yScale = d3.scaleLinear().range ([height, 0]);

var g = svg.append("g")
        .attr("transform", "translate(" + 100 + "," + 100 + ")");
	
///////////////////
// GET THE DATA //
/////////////////
	
d3.json("gender-pay-gap-2014.json", function(data) { // loading the data with the d3.json function
    
	console.log(data);
	
	data.forEach(function(d) {
 	d.text = d.text;
 	d.value = +d.revenue; // conversion to final handle bar height
 	});
	
	// mapping the data against the scale
	xScale.domain(data.map(function(d) { return d.text; }));
	yScale.domain([0, d3.max(data, function(d) { return d.value; })]);
	
	// add x-axis
	g.append("g")
	 .attr("transform", "translate(0," + height + ")")
	 .call(d3.axisBottom(xScale));
	
	// add y-axis
	g.append("g")
	 .call(d3.axisLeft(yScale).tickFormat(function(d){
		 return "$" + d;
	 }).ticks(10));
	
	// adding the bars
	g.selectAll("rect")
         .data(data)
         .enter().append("rect")
         .style("fill", "steelblue")
         .attr("x", function(d) { return xScale(d.text); })
         .attr("y", function(d) { return yScale(d.value); })
         .attr("width", xScale.bandwidth())
         .attr("height", function(d) { return height - yScale(d.text); });
	
// d3.json function end:
});