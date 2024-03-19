import { FC } from 'react';

import './style.css';

const timeLine = [
    {
        userName: 'Oleg',
        dates: [
            {startDate: '13.11.2023', endDate: '13.11.2023'},
            {startDate: '15.11.2023', endDate: '16.11.2023'},
            {startDate: '22.11.2023', endDate: '24.11.2023'},
        ]
    },
    {
        userName: 'Ivan',
        dates: [
            {startDate: '13.11.2023', endDate: '14.11.2023'},
            {startDate: '16.11.2023', endDate: '16.11.2023'},
            {startDate: '19.11.2023', endDate: '19.11.2023'},
            {startDate: '23.11.2023', endDate: '24.11.2023'},
        ]
    },
    {
        userName: 'Boris',
        dates: [
            {startDate: '14.11.2023', endDate: '14.11.2023'},
            {startDate: '15.11.2023', endDate: '15.11.2023'},
            {startDate: '22.11.2023', endDate: '23.11.2023'},
        ]
    },
]

const parseDate = (str: string): Date | null => {
    const m = str.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
    return m ? new Date(Number(m[3]), Number(m[2])-1, Number(m[1])) : null;
}

const App: FC = () => {
    const userNames = timeLine.map(({userName}) => userName);

    let minDate: Date | null = null, maxDate: Date | null = null;

    const dates = timeLine.map(({dates}) => {
        return dates.map(({startDate, endDate}) => {
            const parsedStartDate = parseDate(startDate);
            const parsedEndDate = parseDate(endDate);

            if (!minDate || (parsedStartDate && parsedStartDate < minDate)) {
                minDate = parsedStartDate && new Date(parsedStartDate);
            }

            if (!maxDate || (parsedEndDate && parsedEndDate > maxDate)) {
                maxDate = parsedEndDate && new Date(parsedEndDate);
            }

            return {startDate: parsedStartDate, endDate: parsedEndDate};
        })
    });

    let currentDate: Date | null = minDate;
    let availableDates: Date[] = [];
    if (currentDate && maxDate) {
        while (currentDate <= maxDate) {
            availableDates.push(new Date(currentDate));
            (currentDate as Date).setDate((currentDate as Date).getDate() + 1);
        }
    }

    return (
        <div>
            {userNames.map((userName, index) =>
                <div key={userName} className='calendar_row'>
                    <div className='calendar_cell'>
                        {userName}
                    </div>
                    {availableDates.map((date) => {
                        let backgroundColor: string = 'white';
                        dates[index].forEach(({startDate, endDate}) => {
                            if (startDate && endDate && date >= startDate && date <= endDate) {
                                backgroundColor = 'red';
                            }
                        })
                        let dateIsFreeForEveryBody = true;
                        dates.forEach((userDates) => {
                            userDates.forEach(({startDate, endDate}) => {
                                if (startDate && endDate && date >= startDate && date <= endDate) {
                                    dateIsFreeForEveryBody = false;
                                }
                            })
                        })
                        if (dateIsFreeForEveryBody) {
                            backgroundColor = 'green';
                        }
                        return (
                            <div
                                key={`${userName}${date.toLocaleDateString()}`}
                                className={`calendar_cell calendar_cell__color_${backgroundColor}`}
                            />
                        )
                    })}
                </div>
            )}
            <div className='calendar_row'>
                <div className='calendar_cell' />
                {availableDates.map((date) =>
                    <div
                        key={date.toLocaleDateString()}
                        className='calendar_cell calendar_cell__date'
                    >
                        {date.toLocaleDateString()}
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;