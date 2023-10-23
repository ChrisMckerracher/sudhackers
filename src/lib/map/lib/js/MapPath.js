import * as d3 from "d3";
import * as topojson from "topojson";
import toronto from "../json/toronto_topo.json";
import {MapRegion} from "./MapRegions.js";

class MapPath {
    constructor() {
        const width = 500;
        const height = 500;

        const zoom = d3.zoom()
            .scaleExtent([1, 8])
            .on("zoom", zoomed);

        this.svg = svg;
        this.svg = d3.select("#map")
            .append("svg");
        this.initSvg();
        this.g = this.svg.append("g")
        this.path = this.initPath();


        this.clicked = this.clicked.bind(this);
        this.reset = this.reset.bind(this);
        this.zoomed = this.zoomed.bind(this);

        this.svg.node();

    }

    initPath() {
        let neighbourhoods = topojson.feature(toronto, toronto.objects.toronto);


        let mapRegions = neighbourhoods.features.map(neighbourhood =>
            new MapRegion(neighbourhood.properties.id, neighbourhood.geometry)
        );
        const map = new Map(mapRegions);

        let projection = d3.geoAlbers();
        projection
            .scale(1)
            .translate([0, 0]);

        let path = d3.geoPath()
            .projection(projection);


        let b = path.bounds(neighbourhoods),
            s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
            t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

        projection
            .scale(s)
            .translate(t);


        const states = this.g.append("g")
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

        return path;
    }

    initSvg() {
        //hack so that we don't interact with map at all
        this.svg = this.svg.attr("width", width)
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
            }));
    }

    drawMap() {

    }

    clicked(event, d) {
        this.svg.call(zoom);
        let [[x0, y0], [x1, y1]] = path.bounds(d);
        console.log(path.bounds(d))
        event.stopPropagation();
        this.svg.transition().duration(750).call(
            zoom.transform,
            d3.zoomIdentity
                .translate(width / 2, height / 2)
                .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)))
                .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
            d3.pointer(event, this.svg.node())
        );

        let selectedPath = states.filter(function (state) {
            const [[stateX0, stateY0], [stateX1, stateY1]] = path.bounds(state);
            return stateX0 === x0 && stateY0 === y0 && stateX1 === x1 && stateY1 === y1;
        });

        selectedPath.transition().style("fill", "#2c3330");
        console.log(map);

        this.svg.on(".zoom", null);
    }

    zoomed(event) {
        const {transform} = event;
        g.attr("transform", transform);
        g.attr("stroke-width", 1 / transform.k);
    }
}