# 🌍 Using amCharts 5 and Next.js

This project demonstrates how to create an interactive map with clustered points using **amCharts 5** in a **Next.js** environment. The map showcases cities across the globe with clustering applied to handle dense areas, providing a clean and interactive experience.

## 🚀 Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

Make sure you have the following installed:

- Node.js (>=14.x)
- npm or yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/anilkumarshrestha/amCharts-5-nextjs
   cd amcharts5-nextjs
   ```

2. **Install the dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🛠️ Project Structure

The core logic for rendering the map with clustered points can be found in `page.tsx`. Below is a brief overview of the main parts:

- **Map Creation:** Using `am5.Root.new` to initialize the root element for amCharts.
- **Chart Configuration:** The map is configured with `MapChart` and uses `geoMercator` for the projection.
- **Clustered Points:** Points on the map are clustered using `ClusteredPointSeries` for a clean visualization of densely packed locations.
- **Themes:** The `Animated` theme from amCharts 5 is applied for smooth animations.

## 📄 Example Code

Here's a snippet of the main logic used in this project:

```tsx
import { useEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export default function MapWithClusteredPoints() {
  useEffect(() => {
    let root = am5.Root.new("chartdiv");

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "rotateX",
        panY: "translateY",
        projection: am5map.geoMercator(),
      })
    );

    // Further code omitted for brevity
  }, []);

  return (
    <main>
      <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
    </main>
  );
}
```

## 📚 Learn More

To learn more about amCharts 5 and Next.js, check out the following resources:

- [amCharts 5 Documentation](https://www.amcharts.com/docs/v5/)
- [Next.js Documentation](https://nextjs.org/docs)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
