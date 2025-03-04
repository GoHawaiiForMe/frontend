import { useState } from "react";
import { Calendar as ReactCalendar, CalendarProps } from "react-calendar";
import styled from "styled-components";
import dayjs from "dayjs";

const CustomCalendar = styled(ReactCalendar)`
  width: 350px;

  .react-calendar {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 350px;
    max-width: 100%;
    background: white;
    line-height: 1.125em;
  }

  .react-calendar__tile--disabled {
    color: #ccc;
    pointer-events: none;
  }

  .react-calendar,
  .react-calendar *,
  .react-calendar *:before,
  .react-calendar *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .react-calendar__navigation {
    display: flex;
    height: 44px;
    margin-bottom: 1em;
  }

  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    font: inherit;
    font-size: 0.75em;
    font-weight: bold;
    text-decoration: none;
  }

  .react-calendar__month-view__weekdays__weekday {
    padding: 0.5em;
  }

  .react-calendar__month-view__weekdays__weekday abbr {
    text-decoration: none;
  }

  .react-calendar__month-view__days__day--weekend {
    color: #000000;
  }

  .react-calendar__month-view__days__day--neighboringMonth,
  .react-calendar__decade-view__years__year--neighboringDecade,
  .react-calendar__century-view__decades__decade--neighboringCentury {
    color: #757575;
  }

  .react-calendar__tile {
    max-width: 100%;
    padding: 10px 6.6667px;
    text-align: center;
    font: inherit;
    font-size: 0.833em;
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: #e6e6e6;
    border-radius: 9999px;
  }

  .react-calendar__tile--now {
    background: #d4e5ff;
    border-radius: 9999px;
  }

  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #006edc;
  }

  .react-calendar__tile--hasActive {
    background: #76baff;
  }

  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #a9d4ff;
  }

  .react-calendar__tile--active {
    background: #006edc;
    color: white;
    border-radius: 9999px;
  }

  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #1087ff;
  }

  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #a9d4ff;
  }
`;

export default function Calendar({ onDateChange }: { onDateChange: (date: Date) => void }) {
  const [date, setDate] = useState<Date | null>(new Date());
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const handleDateChange: CalendarProps["onChange"] = (value) => {
    if (value instanceof Date) {
      setDate(value);
      onDateChange(value);
    }
  };

  return (
    <div>
      <CustomCalendar
        onChange={handleDateChange}
        value={date}
        locale="ko-KR"
        selectRange={false}
        formatDay={(locale, date) => dayjs(date).format("DD")}
        tileDisabled={({ date }) => {
          const targetDate = new Date(date);
          targetDate.setHours(0, 0, 0, 0);
          return targetDate < today;
        }}
      />
    </div>
  );
}
