"use client";

import { Range, RangeKeyDict, DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useEffect, useState } from "react";

interface ICalendarInputProps {
  value: Range;
  disabledDates: Date[];
  onChange: (value: RangeKeyDict) => void;
}

const CalendarInput: React.FC<ICalendarInputProps> = ({
  value,
  disabledDates,
  onChange,
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient ? (
        <DateRange
          rangeColors={["green"]}
          ranges={[value]}
          date={new Date()}
          onChange={onChange}
          direction="vertical"
          showDateDisplay={false}
          minDate={new Date()}
          disabledDates={disabledDates}
        />
      ) : (
        <div>Loading ...</div>
      )}
    </>
  );
};

export default CalendarInput;
