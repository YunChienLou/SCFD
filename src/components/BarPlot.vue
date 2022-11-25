<template>
  <h1>BarPlot</h1>
  <div v-bind:id="id"></div>
</template>

<script setup>
import { defineProps, onMounted, ref, toRefs } from "vue";
import { Object2Array } from "../util/Object2Array";
import * as d3 from "d3";

const props = defineProps({
  data: { required: true },
  id: { type: String, required: true },
});
const { data, id } = toRefs(props);
const convertedData = ref([]);
convertedData.value = Object2Array(data.value);
// console.log("convertedData", convertedData.value);

onMounted(() => {
  console.log("BarPlot onMounted")
  drawPlot();
  // console.log("onMounted")
});

const drawPlot = () => {
  // set the dimensions and margins of the graph
  const margin = { top: 10, right: 30, bottom: 150, left: 40 },
    width = 400 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  console.log(id.value)
  // append the svg object to the body of the page
  const svg = d3
    .select("#" + id.value)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);
  // X axis
  const x = d3
    .scaleBand()
    .range([0, width])
    .domain(
      convertedData.value.map(function (d) {
        return d.type;
      })
    )
    .padding(0.2);
  svg
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end")
    .style("font-size", "20px");

  // Add Y axis
  const y = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(convertedData.value, function (d) {
        return d.Num;
      }),
    ])
    .range([height, 0]);
  svg.append("g").call(d3.axisLeft(y));

  // Bars
  svg
    .selectAll("mybar")
    .data(convertedData.value)
    .join("rect")
    .attr("x", (d) => x(d.type))
    .attr("width", x.bandwidth())
    .attr("fill", "#69b3a2")
    .attr("height", () => height - y(0))
    .attr("y", () => y(0));

  // Animation
  svg
    .selectAll("rect")
    .transition()
    .duration(800)
    .attr("y", (d) => y(d.Num))
    .attr("height", (d) => height - y(d.Num))
    .delay((d, i) => {
      return i * 100;
    });

    console.log("svg",svg)
};
</script>

<style></style>
