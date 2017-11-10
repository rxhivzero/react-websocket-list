import { SET_EVENT_LIST, SET_EVENT_VIEWED , SET_EVENT_VIEWED_ALL } from '../actions/action';

let initialState = { eventList: [] };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_EVENT_LIST:
      return {
        eventList: action.eventList
      };
    case SET_EVENT_VIEWED_ALL:
      return {
        eventList: []
      };
    case SET_EVENT_VIEWED:
      let newEventList = state.eventList.filter(event => {
        return event.event_id !== action.eventID;
      });
      return {
        ...state,
        eventList: newEventList
      };
    default:
      return state;
  }
}
