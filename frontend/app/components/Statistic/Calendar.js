export default function Calendar() {
  function getFirstSunday(d) {
    d = new Date(d);
    var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -7 : 0); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }
  function getLastSaturday(d) {
    d = new Date(d);
    var day = d.getDay(),
      diff = d.getDate() - day + (day == 6 ? 0 : 6); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }

  // MAKE it DYNAMIC here
  const addValue = 0;
  const date = new Date();

  const firstSunday = getFirstSunday(
    new Date(date.getFullYear(), date.getMonth() + addValue, 1)
  );
  const lastSaturday = getLastSaturday(
    new Date(date.getFullYear(), date.getMonth() + 1 + addValue, 0)
  );

  // The "firstSunday" HASNT been modified here, this is a safe place to COPY
  const copied_firstSunday = new Date(firstSunday.getTime());

  const calendar = [];

  while (firstSunday.setDate(firstSunday.getDate() - 1) < lastSaturday) {
    // console.log("****************************************");
    calendar.push({
      days: Array(7)
        .fill(0)
        .map(
          () =>
            new Date(firstSunday.setDate(firstSunday.getDate() + 1))
              .toISOString()
              .split("T")[0]
        ),
    });
    new Date(firstSunday.setDate(firstSunday.getDate() + 1))
      .toISOString()
      .split("T")[0];
    // console.log("****************************************");
  }

  const flat_calendar = [];

  while (
    copied_firstSunday.setDate(copied_firstSunday.getDate() - 1) < lastSaturday
  ) {
    flat_calendar.push(
      new Date(copied_firstSunday.setDate(copied_firstSunday.getDate() + 1))
        .toISOString()
        .split("T")[0]
    );
    new Date(copied_firstSunday.setDate(copied_firstSunday.getDate() + 1))
      .toISOString()
      .split("T")[0];
  }

  //========================To get the current Month ===========================================
  let currentMonth = parseInt(new Date().getMonth()) + 1;

  if (currentMonth < 10) {
    currentMonth = "0" + currentMonth;
  } else {
    currentMonth = currentMonth.toString();
  }
  console.log("currentMonth: " + currentMonth);
  //=========================To get the current Month ==========================================

  return [calendar, flat_calendar, currentMonth];
}
