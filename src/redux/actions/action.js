export const SET_EVENT_LIST = 'SET_EVENT_LIST';
export const SET_EVENT_VIEWED = 'SET_EVENT_VIEWED';
export const SET_EVENT_VIEWED_ALL = 'SET_EVENT_VIEWED_ALL';

export function setEventList(eventList) {
  return {
    type: SET_EVENT_LIST,
    eventList: eventList
  };
}


export function setEvenViewed(eventID) {
  return {
    type: SET_EVENT_VIEWED,
    eventID: eventID
  };
}

export function setEvenViewedAll() {
  return {
    type: SET_EVENT_VIEWED_ALL
  };
}
