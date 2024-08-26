"use client";

import { useEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import am5index from "@amcharts/amcharts5/index";
import * as am5map from "@amcharts/amcharts5/map";
// import am5geodata_worldLow from "@amcharts/amcha/rts5-geodata";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export default function MapWithClusteredPoints() {
  useEffect(() => {
    /* Chart code */
    // Create root element
    let root = am5.Root.new("chartdiv");

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create the map chart
    let chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "rotateX",
        panY: "translateY",
        projection: am5map.geoMercator(),
      })
    );

    let zoomControl = chart.set(
      "zoomControl",
      am5map.ZoomControl.new(root, {})
    );
    zoomControl.homeButton.set("visible", true);

    // Create main polygon series for countries
    // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
    let polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        exclude: ["AQ"],
      })
    );

    polygonSeries.mapPolygons.template.setAll({
      fill: am5.color(0xdadada),
    });

    // Create point series for markers
    // https://www.amcharts.com/docs/v5/charts/map-chart/map-point-series/
    let pointSeries = chart.series.push(
      am5map.ClusteredPointSeries.new(root, {})
    );

    // Set clustered bullet
    // https://www.amcharts.com/docs/v5/charts/map-chart/clustered-point-series/#Group_bullet
    pointSeries.set("clusteredBullet", function (root) {
      let container = am5.Container.new(root, {
        cursorOverStyle: "pointer",
      });

      let circle1 = container.children.push(
        am5.Circle.new(root, {
          radius: 8,
          tooltipY: 0,
          fill: am5.color(0xff8c00),
        })
      );

      let circle2 = container.children.push(
        am5.Circle.new(root, {
          radius: 12,
          fillOpacity: 0.3,
          tooltipY: 0,
          fill: am5.color(0xff8c00),
        })
      );

      let circle3 = container.children.push(
        am5.Circle.new(root, {
          radius: 16,
          fillOpacity: 0.3,
          tooltipY: 0,
          fill: am5.color(0xff8c00),
        })
      );

      let label = container.children.push(
        am5.Label.new(root, {
          centerX: am5.p50,
          centerY: am5.p50,
          fill: am5.color(0xffffff),
          populateText: true,
          fontSize: "8",
          text: "{value}",
        })
      );

      container.events.on("click", function (e) {
        pointSeries.zoomToCluster(e.target.dataItem);
      });

      return am5.Bullet.new(root, {
        sprite: container,
      });
    });

    // Create regular bullets
    pointSeries.bullets.push(function () {
      let circle = am5.Circle.new(root, {
        radius: 6,
        tooltipY: 0,
        fill: am5.color(0xff8c00),
        tooltipText: "{title}",
      });

      return am5.Bullet.new(root, {
        sprite: circle,
      });
    });

    // Set data
    let cities = [
      { title: "Malibu, California", latitude: 36.7783, longitude: -119.4179 },
      { title: "Brooklyn, NY", latitude: 40.7128, longitude: -74.006 },
      { title: "Detroit, MI", latitude: 44.3148, longitude: -85.6024 },
      { title: "Tokyo, Japan", latitude: 35.6824, longitude: 139.759 },
      { title: "Istanbul, Turkey", latitude: 41.0082, longitude: 28.9784 },
      { title: "Mumbai, India", latitude: 19.076, longitude: 72.8777 },
      { title: "Shanghai, China", latitude: 31.2304, longitude: 121.4737 },
    ];
    for (var i = 0; i < cities.length; i++) {
      let city = cities[i];
      addCity(city.longitude, city.latitude, city.title);
    }

    function addCity(longitude: number, latitude: number, title: string) {
      pointSeries.data.push({
        geometry: { type: "Point", coordinates: [longitude, latitude] },
        title: title,
      });
    }

    // Make stuff animate on load
    chart.appear(1000, 100);

    // cleaning
    return () => {
      root.dispose();
    };
  }, []);

  return (
    <main>
      {/* amCharts5 div */}
      <div
        id="chartdiv"
        className="mt-[28px] md:mt-[110px]"
        style={{ width: "100%", height: "500px" }}
      ></div>
    </main>
  );
}
