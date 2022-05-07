async function renderGraph() {
  //   let data;

  //   await fetch(
  //     "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
  //   )
  //     .then((response) => response.json())
  //     .then((jsonData) => (data = jsonData));
  const data = await fetch(
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
  ).then((response) => response.json());
  console.log(data);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data.data, (d) => d[1])])
    .range([0, window.visualViewport.height]);
  const xScale = d3
    .scaleLinear()
    .domain([0, data.data.length - 1])
    .range([40, window.visualViewport.width-44]);

  const svg = d3
    .select("body")
    .append("svg")
    .attr("width", "100vw")
    .attr("height", "100vh");

  const barWidth = window.visualViewport.width / data.data.length;
  svg
    .selectAll("rect")
    .data(data.data)
    .enter()
    .append("rect")
    .style("background-color", "blue")
    .style("width", barWidth)
    .style("height", (d) => yScale(d[1]))
    .attr("x", (d, i) => xScale(i))
    .attr("y", (d) => {
      return window.visualViewport.height - yScale(d[1] - 10);
    });

  // const yAxis = d3.axisLeft(yScale);
  // const xAxis = d3.axisBottom(xScale);
  const xAxis = d3.axisBottom(
    d3
      .scaleLinear()
      .range([0, window.visualViewport.width])
      .domain([1947, 2015])
  );
  const yAxis = d3.axisLeft(
    d3
    .scaleLinear()
    .domain([d3.max(data.data, (d) => d[1]), 0])
    .range([10, window.visualViewport.height])
  );
  svg.append("g").attr("class", "translate-x-10").call(yAxis);
  svg.append("g").attr("class", "translate-y-10").call(xAxis);
}
renderGraph();
