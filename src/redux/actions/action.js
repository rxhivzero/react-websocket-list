import { log } from "util";

export const SET_EVENT_LIST = 'SET_EVENT_LIST';
export const SET_EVENT_VIEWED = 'SET_EVENT_VIEWED';
export const SET_EVENT_VIEWED_ALL = 'SET_EVENT_VIEWED_ALL';
export const SHOW_MODAL = 'SHOW_MODAL';
export const SET_CATEGORY = 'SET_CATEGORY';
export const ADD_EVENT = 'ADD_EVENT';


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

export function showModal(showEvent) {
  return {
    type: SHOW_MODAL,
    showEvent: showEvent
  };
}

export function setCategory(showEvent) {
  return {
    type: SET_CATEGORY,
    showEvent: showEvent
  };
}

export function addEvent(event) {
  return {
    type: ADD_EVENT,
    event: event
  };
}
