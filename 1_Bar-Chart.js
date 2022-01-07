document.body.addEventListener("onDOMContentLoaded", () => {
  let data;

  fetch(
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
  )
    .then((response) => response.json())
    .then((jsonData) => (data = jsonData));

  const svg = d3
    .select("body")
    .append("svg")
    .attr("width", "1000") //just an arbitary size to check if the code works
    .attr("height", "1000");

  svg
    .selectAll("rect")
    .data(data.data)
    .enter()
    .append("rect")
    .style("background-color", "blue")
    .style("width", "10px")
    .style("height", (d) => d[1])
    .attr("x", (d, i) => i * 11)
    .attr("y", (d) => {
      return 1000 - d[1];
    });
});
