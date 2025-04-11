"use client"

import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

type TransactionsGraphProps = {
    chartCountArray: (string | number)[][];
}

export default function SpendingGraph({chartCountArray}: TransactionsGraphProps) {
    return(
        <Chart
            // Try different chart types by changing this property with one of: LineChart, BarChart, AreaChart...
            chartType="PieChart"
            data={
                chartCountArray
            }
            options={{
                is3D: true, // Enables 3D view
                // slices: {
                //   1: { offset: 0.2 }, // Explodes the second slice
                // },
                pieStartAngle: 0, // Rotates the chart
            }}
            width={"600px"}
            height={"400px"}
        />
    );
};