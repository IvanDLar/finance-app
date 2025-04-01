"use client"

import { useEffect, useState } from "react";
import styles from "./DatePicker.module.css";

type MonthMapType = {
    [key: string]: string;
}

type DatePickerProps = {
    date: string;
    setDate: Function;
}
const monthsMap:MonthMapType = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    "10": "October",
    "11": "November",
    "12": "December",
}
export default function DatePicker({date, setDate}: DatePickerProps) {
    const [displayDate, setDisplayDate] = useState<string>("January 2025");
    const transformDate = (date:string): void => {
        const [year, month] = date.split("-");
        const transformedMonth = monthsMap[month];
        const transformedDate = `${transformedMonth} ${year}`;
        // Transform date
        setDisplayDate(transformedDate);
    }

    const handleDateChange = (operation:string) : void => {
        const [year, month] = date.split("-");
        let integerMonth = Number(month);
        let integerYear = Number(year);

        if (operation == "decrease") {
            if (integerMonth > 1) integerMonth -= 1;
            else {
                integerYear -= 1;
                integerMonth = 12;
            }
        }
        else if (operation == "increase") {
            if (integerMonth < 12) integerMonth += 1;
            else {
                integerYear += 1;
                integerMonth = 1;
            }
        }

        // Re-build date
        const newDate = `${String(integerYear)}-${integerMonth < 10 ? "0" : "" }${String(integerMonth)}`
        setDate(newDate);
        transformDate(date);
    };

    useEffect(() => {
        transformDate(date);
    }, [])

    useEffect(() => {
        transformDate(date);
    }, [date, displayDate]);

    return (
        <h1>
            <a className={styles["change-date-arrows"]}
                onClick={() => handleDateChange("decrease")}>
                {"<- "}
            </a>
            {date && displayDate}
            <a className={styles["change-date-arrows"]}
                onClick={() => handleDateChange("increase")}>
                {" ->"}
            </a>
        </h1>
    );
};
