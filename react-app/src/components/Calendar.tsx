import React from "react";
import {Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, EventSettingsModel } from "@syncfusion/ej2-react-schedule";

export default function Calendar() {

    const localData: EventSettingsModel = {
        dataSource: [{
            EndTime: new Date(2021, 0, 1, 1, 1, 30),
            StartTime: new Date(2021, 1, 1, 1, 1, 0)
        }]
    }
    return (<ScheduleComponent eventSettings={localData}>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
    </ScheduleComponent>);
}
