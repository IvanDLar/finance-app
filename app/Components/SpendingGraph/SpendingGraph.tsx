"use client"

import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

type TransactionsGraphProps = {
    chartCountArray: (string | number)[][];
}

export default function SpendingGraph({chartCountArray}: TransactionsGraphProps) {
    // let [chartCountArray, setChartCountArray] = useState<(string | number)[][]>();
    // const countCategories = () => {
    //     let categoryCountMap = new Map();
    //     for (let transaction of data) {
    //         const transactionCategory = transaction.category;
    //         if (categoryCountMap.has(transactionCategory)) {
    //             const newTransactionCategoryCount = categoryCountMap.get(transactionCategory) + 1;
    //             categoryCountMap.set(transactionCategory,newTransactionCategoryCount);
    //         } else {
    //             categoryCountMap.set(transactionCategory, 1);
    //         }
    //     }
    //     buildGraphArray(categoryCountMap);
    // }

    // const buildGraphArray = (categoryCountMap:Map<string, number>) => {
    //     const newChartCountArray = [];
    //     for (let [key, value] of categoryCountMap) {
    //         newChartCountArray.push([key, value]);
    //     }
    //     newChartCountArray.unshift(["Categories", "Transaction Count"]);
    //     setChartCountArray(newChartCountArray);
    // }

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