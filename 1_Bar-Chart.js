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

  const yScale = d3
    .scaleLinear()
    .domain([d3.min(data.data, (d) => d[1]), d3.max(data.data, (d) => d[1])])
    .range([10, window.visualViewport.height]);
  const xScale = d3
    .scaleLinear()
    .domain([0, data.data.length - 1])
    .range([0, window.visualViewport.width]);

  const svg = d3
    .select("body")
    .append("svg")
    .attr("width", "100vw") //just an arbitary size to check if the code works
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
      return window.visualViewport.height - yScale(d[1]);
    });
}
renderGraph();
