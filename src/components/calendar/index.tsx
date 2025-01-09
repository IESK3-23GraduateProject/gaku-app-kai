import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react'
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
    startOfWeek,
    endOfWeek,
} from 'date-fns'
import { useState } from 'react'

function classNames(...classes: (string | boolean)[]) {
    return classes.filter(Boolean).join(' ')
}

type Event = {
    event_id: number;
    title: string;
    description: string;
    location: string;
    start_datetime: string;
    end_datetime: string;
    related_news_url: string;
    is_public: boolean;
    is_cancelled: boolean;
    created_at: string;
    updated_at:string;
};

interface CalendarProps {
    events: Event[];
}

export default function Calendar({ events }: CalendarProps) {
    let today = startOfToday()
    let [selectedDay, setSelectedDay] = useState(today)
    let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
    let [isWeekView, setIsWeekView] = useState(false)
    let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())

    // Get days based on current view
    let days = isWeekView
        ? eachDayOfInterval({
            start: startOfWeek(selectedDay),
            end: endOfWeek(selectedDay),
        })
        : eachDayOfInterval({
            start: firstDayCurrentMonth,
            end: endOfMonth(firstDayCurrentMonth),
        })

    function previousPeriod() {
        if (isWeekView) {
            setSelectedDay(add(selectedDay, { weeks: -1 }))
        } else {
            let firstDayPreviousMonth = add(firstDayCurrentMonth, { months: -1 })
            setCurrentMonth(format(firstDayPreviousMonth, 'MMM-yyyy'))
        }
    }

    function nextPeriod() {
        if (isWeekView) {
            setSelectedDay(add(selectedDay, { weeks: 1 }))
        } else {
            let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
            setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
        }
    }

    function toggleView() {
        setIsWeekView(!isWeekView)
    }

    let selectedDayEvents = events.filter((event) =>
        isSameDay(parseISO(event.start_datetime), selectedDay)
    )

    return (
        <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
            <div className="md:pr-14">
                <div className="flex items-center justify-between">
                    <h2 className="flex-auto font-semibold text-gray-900">
                        {isWeekView
                            ? `Week of ${format(startOfWeek(selectedDay), 'MMM d, yyyy')}`
                            : format(firstDayCurrentMonth, 'MMMM yyyy')}
                    </h2>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={toggleView}
                            type="button"
                            className="flex items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                        >
                            <CalendarIcon className="w-5 h-5" />
                            <span className="ml-1 text-sm">
                                {isWeekView ? 'Month' : 'Week'}
                            </span>
                        </button>
                        <button
                            type="button"
                            onClick={previousPeriod}
                            className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                        >
                            <span className="sr-only">Previous {isWeekView ? 'week' : 'month'}</span>
                            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                        </button>
                        <button
                            onClick={nextPeriod}
                            type="button"
                            className="-my-1.5 -mr-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                        >
                            <span className="sr-only">Next {isWeekView ? 'week' : 'month'}</span>
                            <ChevronRight className="w-5 h-5" aria-hidden="true" />
                        </button>
                    </div>
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
                                !isWeekView && dayIdx === 0 && colStartClasses[getDay(day)],
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
                                    isSameDay(parseISO(event.start_datetime), day)
                                ) && (
                                        <div className="w-1 h-1 rounded-full bg-sky-500"></div>
                                    )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <section className="mt-6 md:mt-0 md:pl-14">
                <h2 className="font-semibold text-gray-900">
                    Events for{' '}
                    <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
                        {format(selectedDay, 'MMM dd, yyyy')}
                    </time>
                </h2>
                <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500 min-h-24">
                    {selectedDayEvents.length > 0 ? (
                        selectedDayEvents.map((event) => (
                            <Event event={event} key={event.event_id} />
                        ))
                    ) : (
                        <p>No Events for today.</p>
                    )}
                </ol>
            </section>
        </div>
    )
}

function Event({ event }: { event: Event }) {
    let startDateTime = parseISO(event.start_datetime)
    let endDateTime = parseISO(event.end_datetime)

    return (
        <li className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100">
            {/* <img
                src={event.imageUrl}
                alt=""
                className="flex-none w-10 h-10 rounded-full"
            /> */}
            <div className="flex-auto">
                <p className="text-gray-900">{event.title}</p>
                <p className="mt-0.5">
                    <time dateTime={event.start_datetime}>
                        {format(startDateTime, 'h:mm a')}
                    </time>{' '}
                    -{' '}
                    <time dateTime={event.end_datetime}>
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
