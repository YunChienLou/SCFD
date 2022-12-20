<template>
  <div :id="id"></div>
</template>

<script>
import * as d3 from "d3";
import { onMounted, toRef } from "@vue/runtime-core";
export default {
  name: "PieChart",
  props: {
    data: {
      require: true,
    },
    id: {
      require: true,
    },
  },
  setup(props) {
    // set the dimensions and margins of the graph
    const width = 400,
      height = 400,
      margin = 130;

    const idRef = toRef(props, "id");

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    const radius = Math.min(width, height) / 2 - margin;

    const draw = () => {
      const svg = d3
        .select("#" + props.id)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

      // set the color scale
      const color = d3
        .scaleOrdinal()
        .range([
          "#4e79a7",
          "#f28e2c",
          "#e15759",
          "#76b7b2",
          "#59a14f",
          "#edc949",
          "#af7aa1",
          "#ff9da7",
          "#9c755f",
          "#bab0ab",
        ]);

      // Compute the position of each group on the pie:
      const pie = d3.pie().value(function (d) {
        return d[1];
      });
      const data_ready = pie(Object.entries(props.data));
      // Now I know that group A goes from 0 degrees to x degrees and so on.

      // shape helper to build arcs:
      const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);

      // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
      svg
        .selectAll("mySlices")
        .data(data_ready)
        .join("path")
        .attr("d", arcGenerator)
        .attr("fill", function (d) {
          return color(d.data[0]);
        })
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.8);

      // Now add the annotation. Use the centroid method to get the best coordinates
      svg
        .selectAll("mySlices")
        .data(data_ready)
        .join("text")
        .text(function (d) {
          return d.data[0] + "(" + d.data[1] + ")";
        })
        .attr("transform", function (d) {
          //   return `translate(${arcGenerator.centroid(d)})`;
          var c = arcGenerator.centroid(d);
          return "translate(" + c[0] * 4 + "," + c[1] * 2.5 + ")";
        })
        .style("text-anchor", "middle")
        .style("font-size", 17)
        .style("background-color", "white")
        .style("background", "white");
      d3.selectAll("text")
        .style("fill", "white")
        .style("background-color", "#FE8020")
        .style("box-shadow", "-16px 0 0 #FE8020");
    };
    onMounted(() => {
      if (props.data != undefined) {
        draw();
      }
    });
    return {
      idRef,
    };
  },
};
</script>

<style></style>
