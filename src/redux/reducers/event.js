import { SET_EVENT_LIST, SET_EVENT_VIEWED , SET_EVENT_VIEWED_ALL , SHOW_MODAL, SET_CATEGORY ,ADD_EVENT } from '../actions/action';

let initialState = { eventList: [] , showEvent:'' , showModal:false };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_EVENT_LIST:
      return {
        ...state,
        eventList: action.eventList
      };
    case SET_EVENT_VIEWED_ALL:
      return {
        ...state,
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
    case SHOW_MODAL:
      return {
        ...state,
        showModal: !state.showModal,
        showEvent:action.showEvent
      };
    case SET_CATEGORY:
      newEventList = state.eventList.filter(event => {
        if(event.event_id === action.showEvent.event_id){
          event = action.showEvent;
        }
        return event;
      });
      return {
        ...state,
        showEvent:action.showEvent,
        eventList: newEventList
      };
    case ADD_EVENT:
      newEventList = state.eventList;
      newEventList.push(action.event)
      newEventList = newEventList.sort(function (a, b) {
        return new Date(b.starting_timestamp) - new Date(a.starting_timestamp);
      })
      return {
        ...state,
        eventList: newEventList
      };
    default:
      return state;
  }
}
