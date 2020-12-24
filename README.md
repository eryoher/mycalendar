# Mycalendar

Calendar application built entirely using React, redux. The calendar itself was made from scratch.

## Instalation

The calendar app is runing next url page [ calendarApp ](https://mycalendar-react.herokuapp.com/)

if you want to install follow the next steps

1. git clone https://github.com/eryoher/mycalendar.git
2. cd mycalendar
3. yarn install or npm install
4. yarn start or npm run start

## Tools Used

- [React](https://reactjs.org/) was the framework used, as well as its [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [Redux](https://redux.js.org/) for stage management
- Notorious middlewares such as [redux-saga](https://www.npmjs.com/package/redux-saga)
- Time parsing using [moment](https://www.npmjs.com/package/moment)
- Some other ui components such as [react-datepicker](https://reactdatepicker.com/)

## Achieved Scope

The project includes **all** mandatory and bonus features across **two different views**

### Calendar view contains the following functionalities

- Create new reminders with all the required parameters by clicking **+**
- Displays reminders ordered by time
- Color selection for reminders, as well as displaying them in said color
- (Optional) Calendar handles more than one month
- (Optional) Calendar cells scroll to properly handle
- (Optional) Delete all reminders in a day by clicking the **[x]** button in a calendar cell

### Calendar details (accessible after clicking a reminder)

- Edit the current reminder
- Has a weather service to [Open Weather Map](https://openweathermap.org/forecast16)
