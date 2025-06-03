"use client"
// TODO Total SUM
import { Chart } from "react-google-charts";
import styles from "./SpendingGraph.module.css";

type TransactionsGraphProps = {
    totalSum: (number);
    chartCountArray: (string | number)[][];
}

export default function SpendingGraph({totalSum, chartCountArray}: TransactionsGraphProps) {
    return(
    <div className={styles.chartWrapper}>
      <div className={styles.chartContainer}>
        <Chart
            chartType="PieChart"
            data = {chartCountArray}
            options={{
                is3D: true, // Enables 3D view
                pieStartAngle: 0, // Rotates the chart
            }}
            width={"100%"}
            height={"400px"}
        />
        </div>
    </div>
    );
};