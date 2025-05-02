"use client"

import { Chart } from "react-google-charts";

type TransactionsGraphProps = {
    chartCountArray: (string | number)[][];
}

export default function SpendingGraph({chartCountArray}: TransactionsGraphProps) {
    console.log("IN THE ELEMENT", chartCountArray)
    return(
        <Chart
            chartType="PieChart"
            data = {chartCountArray}
            options={{
                is3D: true, // Enables 3D view
                pieStartAngle: 0, // Rotates the chart
            }}
            width={"600px"}
            height={"400px"}
        />
    );
};