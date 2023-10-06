<script>

    //https://gist.github.com/jasonicarter/639c7f839c9c6e8c02a8eea9ac4bd1b0
    //https://observablehq.com/@d3/zoom-to-bounding-box?intent=fork
    import * as d3 from "d3";
    import toronto from "./lib/js/toronto_topo.json";
    import * as topojson from "topojson";
    import {onMount, tick} from "svelte";
    import TextGenerator from "../text/TextGenerator.svelte";

    export let isLoading;

    let title = "Toronto";

    $: if (isLoading == false) {
        runStuff()
    }


    onMount(async () => {
        if (isLoading) {
            return;
        }

        runStuff();
    })

    async function runStuff() {
        await tick();
        const width = 500;
        const height = 500;

        const zoom = d3.zoom()
            .scaleExtent([1, 8])
            .on("zoom", zoomed);

        const svg = d3.select("#map")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .on("click", reset)
            .on('mousedown.zoom', null)
            .on("touchstart.zoom", null)
            .on("touchmove.zoom", null)
            .on("touchend.zoom", null)
            .on("wheel.zoom", null)
            .on("touchstart.zoom", null)
            .on("touchmove.zoom", null)
            .on("touchend.zoom", null)
            .on(".drag", null)
            .call(d3.drag().on("start", () => {
            }))


        var neighbourhoods = topojson.feature(toronto, toronto.objects.toronto);

        var projection = d3.geoAlbers();
        projection
            .scale(1)
            .translate([0, 0]);

        var path = d3.geoPath()
            .projection(projection);


        var b = path.bounds(neighbourhoods),
            s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
            t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

        projection
            .scale(s)
            .translate(t);


        const g = svg.append("g")

        const states = g.append("g")
            .attr("fill", "#96B3AE")
            .attr("cursor", "pointer")
            .selectAll("path")
            .data(topojson.feature(toronto, toronto.objects.toronto).features)
            .join("path")
            .on("click", clicked)
            .attr("d", path);

        states.append("title")
            .text(d => d.properties.name);

        g.append("path")
            .attr("fill", "none")
            .attr("stroke", "white")
            .attr("stroke-linejoin", "round")
            .attr("d", path(topojson.mesh(toronto, toronto.objects.toronto, (a, b) => a !== b)));


        function reset() {
            title = "Toronto";
            svg.call(zoom);
            states.transition().style("fill", null);
            svg.transition().duration(750).call(
                zoom.transform,
                d3.zoomIdentity
                    .translate(0, 0)
                    .scale(1),
                d3.zoomTransform(svg.node()).invert([width / 2, height / 2])
            );
            svg.on(".zoom", null);
        }

        function clicked(event, d) {
            title = d.properties.name;
            svg.call(zoom);
            const [[x0, y0], [x1, y1]] = path.bounds(d);
            event.stopPropagation();
            states.transition().style("fill", null);
            d3.select(this).transition().style("fill", "#2c3330");
            svg.transition().duration(750).call(
                zoom.transform,
                d3.zoomIdentity
                    .translate(width / 2, height / 2)
                    .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)))
                    .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
                d3.pointer(event, svg.node())
            );
            svg.on(".zoom", null);
        }

        function zoomed(event) {
            const {transform} = event;
            g.attr("transform", transform);
            g.attr("stroke-width", 1 / transform.k);
        }

        svg.node();


    }

</script>

<style>
    #map-container {
        top: 1px;
        right: 0px;
        width: 500px;
        height: 500px;
        margin-right: 1px;
        overflow: hidden;
    }

    #radar {
        position: absolute;
        width: 500px;
        height: 500px;
        pointer-events: none;
    }

    #map {
        animation: radarAnimation 5s ease-in-out infinite;
    }

</style>

<div class="ui-element" id="map-container">

    {#if !isLoading}
        {title}
        <div id="map"></div>
    {:else}
        Loading
        <div class="flex-center">
            <TextGenerator text={"Loading"} showCursor={true}></TextGenerator>
        </div>
    {/if}
    <div id="radar"></div>

</div>