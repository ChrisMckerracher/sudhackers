<script>
    // THIS WHOLE FUCKING CLASS NEEDS A MAJOR FUCKING REFACTOR

    //https://gist.github.com/jasonicarter/639c7f839c9c6e8c02a8eea9ac4bd1b0
    //https://observablehq.com/@d3/zoom-to-bounding-box?intent=fork
    import * as d3 from "d3";
    import toronto from "./lib/json/toronto_topo.json";
    import * as topojson from "topojson";
    import {onMount, tick} from "svelte";
    import TextGenerator from "../text/TextGenerator.svelte";
    import {Map as RegionMap, MapRegion} from "./lib/js/MapRegions.js";
    import {sleep} from "../util/util.js";

    export let isLoading;

    let title = "Toronto";

    $: if (isLoading == false) {
        //runStuff();
    }


    onMount(async () => {
        if (isLoading) {
            return;
        }

        await runStuff();
        flashAndZoom(13);
    })

    let svg;
    let path;
    let zoom;
    let states;
    const width = 500;
    const height = 500;

    let map;

    async function runStuff() {
        await tick();


        zoom = d3.zoom()
            .scaleExtent([1, 8])
            .on("zoom", zoomed);

        //hack so that we don't interact with map at all
        svg = d3.select("#map")
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


        let neighbourhoods = topojson.feature(toronto, toronto.objects.toronto);
        console.log(neighbourhoods);

        let mapRegions = new Map();
        neighbourhoods.features.forEach(neighbourhood =>
            mapRegions.set(neighbourhood.properties.id, new MapRegion(neighbourhood.properties.id, neighbourhood.properties.name, neighbourhood.geometry))
        );

        map = new RegionMap(mapRegions);
        console.log(map);

        let projection = d3.geoAlbers();
        projection
            .scale(1)
            .translate([0, 0]);

        path = d3.geoPath()
            .projection(projection);


        var b = path.bounds(neighbourhoods),
            s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
            t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

        projection
            .scale(s)
            .translate(t);

        const g = svg.append("g")

        states = g.append("g")
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
            let [[x0, y0], [x1, y1]] = path.bounds(d);
            console.log(path.bounds(d))
            event.stopPropagation();
            svg.transition().duration(750).call(
                zoom.transform,
                d3.zoomIdentity
                    .translate(width / 2, height / 2)
                    .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)))
                    .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
                d3.pointer(event, svg.node())
            );

            let selectedPath = states.filter(function(state) {
                const [[stateX0, stateY0], [stateX1, stateY1]] = path.bounds(state);
                return stateX0 === x0 && stateY0 === y0 && stateX1 === x1 && stateY1 === y1;
            });
            selectedPath.transition().style("fill", "#2c3330");
            console.log(map);

            svg.on(".zoom", null);
        }

        function zoomed(event) {
            const {transform} = event;
            g.attr("transform", transform);
            g.attr("stroke-width", 1 / transform.k);
        }

        svg.node();
    }

    function flashAndZoom(mapId) {
        let mapRegion = map.get(16);
        let [[x0, y0], [x1, y1]] = path.bounds(mapRegion.paths);
        console.log(mapRegion);
        console.log(mapRegion.paths);
        console.log(path.bounds(mapRegion.paths))
        svg.transition().duration(750).call(
            zoom.transform,
            d3.zoomIdentity
                .translate(width / 2, height / 2)
                .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)))
                .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
            //d3.pointer(event, svg.node())
        );

        let selectedPath = states.filter(function(state) {
            const [[stateX0, stateY0], [stateX1, stateY1]] = path.bounds(state);
            return stateX0 === x0 && stateY0 === y0 && stateX1 === x1 && stateY1 === y1;
        });

        title = mapRegion.name;
        blinkRegion(selectedPath);
    }

    async function blinkRegion(selectedPath) {


        while (true) {
            selectedPath.transition().style("fill", "#2c3330");
            await sleep(1000);
            selectedPath.transition().style("fill", null);
            await sleep(1000);

        }

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