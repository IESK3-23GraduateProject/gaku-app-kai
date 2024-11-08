import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
    add,
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    isEqual,
    isSameDay,
    isSameMonth,
    isToday,
    parse,
    parseISO,
    startOfToday,
} from 'date-fns'
import { useState } from 'react'

function classNames(...classes: (string | boolean)[]) {
    return classes.filter(Boolean).join(' ')
}


type Event = {
    id: number;
    name: string;
    imageUrl: string;
    startDatetime: string;
    endDatetime: string;
};

interface CalendarProps {
    events: Event[];
}

export default function Calendar({ events }: CalendarProps) {
    let today = startOfToday()
    let [selectedDay, setSelectedDay] = useState(today)
    let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
    let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())

    let days = eachDayOfInterval({
        start: firstDayCurrentMonth,
        end: endOfMonth(firstDayCurrentMonth),
    })


    function previousMonth() {
        let firstDayPreviousMonth = add(firstDayCurrentMonth, { months: -1 })
        setCurrentMonth(format(firstDayPreviousMonth, 'MMM-yyyy'))
    }

    function nextMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }

    let selectedDayEvents = events.filter((event) =>
        isSameDay(parseISO(event.startDatetime), selectedDay)
    )

    return (
        <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
            <div className="md:pr-14">
                <div className="flex items-center">
                    <h2 className="flex-auto font-semibold text-gray-900">
                        {format(firstDayCurrentMonth, 'MMMM yyyy')}
                    </h2>
                    <button
                        type="button"
                        onClick={previousMonth}
                        className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                    >
                        <span className="sr-only">Previous month</span>
                        <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                    </button>
                    <button
                        onClick={nextMonth}
                        type="button"
                        className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                    >
                        <span className="sr-only">Next month</span>
                        <ChevronRight className="w-5 h-5" aria-hidden="true" />
                    </button>
                </div>
                <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
                    <div className='text-red-600'>S</div>
                    <div>M</div>
                    <div>T</div>
                    <div>W</div>
                    <div>T</div>
                    <div>F</div>
                    <div className='text-sky-600'>S</div>
                </div>
                <div className="grid grid-cols-7 mt-2 text-sm">
                    {days.map((day, dayIdx) => (
                        <div
                            key={day.toString()}
                            className={classNames(
                                dayIdx === 0 && colStartClasses[getDay(day)],
                                'py-1.5'
                            )}
                        >
                            <button
                                type="button"
                                onClick={() => setSelectedDay(day)}
                                className={classNames(
                                    isEqual(day, selectedDay) && 'text-white',
                                    !isEqual(day, selectedDay) &&
                                    isToday(day) &&
                                    'text-sky-500',
                                    !isEqual(day, selectedDay) &&
                                    !isToday(day) &&
                                    isSameMonth(day, firstDayCurrentMonth) &&
                                    'text-gray-900',
                                    !isEqual(day, selectedDay) &&
                                    !isToday(day) &&
                                    !isSameMonth(day, firstDayCurrentMonth) &&
                                    'text-gray-400',
                                    isEqual(day, selectedDay) && isToday(day) && 'bg-sky-500',
                                    isEqual(day, selectedDay) &&
                                    !isToday(day) &&
                                    'bg-gray-900',
                                    !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                                    (isEqual(day, selectedDay) || isToday(day)) &&
                                    'font-semibold',
                                    'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                                )}
                            >
                                <time dateTime={format(day, 'yyyy-MM-dd')}>
                                    {format(day, 'd')}
                                </time>

                            </button>

                            <div className="w-1 h-1 mx-auto mt-1">
                                {events.some((event) =>
                                    isSameDay(parseISO(event.startDatetime), day)
                                ) && (
                                        <div className="w-1 h-1 rounded-full bg-sky-500"></div>
                                    )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <section className="mt-6 md:mt-0 md:pl-14 ">
                <h2 className="font-semibold text-gray-900">
                    Events for{' '}
                    <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
                        {format(selectedDay, 'MMM dd,  yyy')}
                    </time>
                </h2>
                <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500 bg-red-300 rounded-lg min-h-52 ">
                    {selectedDayEvents.length > 0 ? (
                        selectedDayEvents.map((event) => (
                            <Event event={event} key={event.id} />
                        ))
                    ) : (
                        <p>No meetings for today.</p>
                    )}
                </ol>
            </section>
        </div>
    )
}

function Event({ event }: { event: Event }) {
    let startDateTime = parseISO(event.startDatetime)
    let endDateTime = parseISO(event.endDatetime)

    return (
        <li className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100">
            <img
                src={event.imageUrl}
                alt=""
                className="flex-none w-10 h-10 rounded-full"
            />
            <div className="flex-auto">
                <p className="text-gray-900">{event.name}</p>
                <p className="mt-0.5">
                    <time dateTime={event.startDatetime}>
                        {format(startDateTime, 'h:mm a')}
                    </time>{' '}
                    -{' '}
                    <time dateTime={event.endDatetime}>
                        {format(endDateTime, 'h:mm a')}
                    </time>
                </p>
            </div>
        </li>
    )
}


let colStartClasses = [
    '',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    'col-start-7',
]
