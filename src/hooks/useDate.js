import React from "react";
import moment, { Moment } from "moment";

export const useDate = (differenceHours, datetime) => {
  const locale = "en";
  const [today, setDate] = React.useState(new Date()); // Save the current date to be able to trigger an update

  React.useEffect(() => {
    const timer = setInterval(() => {
      // Creates an interval which will update the current data every minute
      // This will trigger a rerender every component that uses the useDate hook.
      setDate(new Date());
    }, 60 * 1000);
    return () => {
      clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
    };
  }, []);

  const date = moment(datetime.slice(0, -13)).format("ddd, MMM D");

  const time = moment(datetime.slice(0, -13)).format("h:mm a");

  return {
    date,
    time,
  };
};
