var w = 800;
var h = 500;
var m = 200;

// creating the SVG and defining the scales for our bar chart
var chart1 = d3.select("#bar-chart1")
		.append("svg")
		.attr("width", w) // width of the entire svg graphic
		.attr("height", h),       
        width = w - m,
        height = h - m;

var xScale = d3.scaleBand().range ([0, width]).padding(0.4),
	yScale = d3.scaleLinear().range ([height, 0]);

var g = chart1.append("g")
        .attr("transform", "translate(" + 100 + "," + 100 + ")");
	
///////////////////
// GET THE DATA //
/////////////////
	
d3.json("bar-chart-axis.json", function(data) { // loading the data with the d3.json function
    
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
	.attr("class", "axis")
	 .attr("transform", "translate(0," + height + ")")
	 .call(d3.axisBottom(xScale))
	 .selectAll("text")	
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
	 .attr("transform", function(d){
		return "rotate(-35)";
	});
	
	// add y-axis
	g.append("g")
	.attr("class", "axis")
	 .call(d3.axisLeft(yScale).tickFormat(function(d){
		 return "$" + d;
	 }).ticks(10));
	
	// adding the bars
	g.selectAll("rect")
         .data(data)
         .enter().append("rect")
         .style("fill", "url(#gradient)")
         .attr("x", function(d) { return xScale(d.text); })
         .attr("y", function(d) { return yScale(d.value); })
         .attr("width", xScale.bandwidth())
         .attr("height", function(d) { return height - yScale(d.value); });
		 
	
	
//////////////////////////////////
// 2. Linear gradient
var defs = chart1.append("defs"); // Step 1: Append the ‘def(inition)s’ and the gradient to the svg
var gradient = defs.append( 'linearGradient' ) // Step 2 is to append a linear gradient and it's specifications to the defs
				   .attr( 'id', 'gradient' ) // Step 3 is to define the unique gradient id
				   // creating a vertical linear gradient
				   .attr( 'x1', '0%' )
				   .attr( 'x2', '0%' )
				   .attr( 'y1', '0%' )
				   .attr( 'y2', '100%' );
gradient.append( 'stop' )
					.attr( 'class', 'start' )
					.attr( 'offset', '0%' )
					.attr("stop-color", "lightblue")
   					.attr("stop-opacity", 1);
gradient.append( 'stop' )
					.attr( 'class', 'end' )
					.attr( 'offset', '100%' )
					.attr("stop-color", "white")
   					.attr("stop-opacity", 1);
//////////////////////////////////
d3.select("#chart1")
	.append("p")
	.text("A SVG bar chart with linear gradient.");
	
// d3.json function end:
});

