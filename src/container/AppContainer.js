import React from 'react';
import { connect } from 'react-redux';
import { setEventList, setEvenViewed, setEvenViewedAll, showModal, setCategory, addEvent } from '../redux/actions/action';
import EventList from '../components/EventList';
import Modal from '../components/Modal';

import io from 'socket.io-client';
import { log } from 'util';

const socket = io('http://localhost:3001');
class AppContainer extends React.Component {
  componentWillMount() {
    const { setEventList, addEvent } = this.props;
    socket.on('eventList', (eventList) => {
      setEventList(eventList);
    });

    socket.on('addEvent', (event) => {
      addEvent(event);
    });
  }
  render() {
    const { event } = this.props;
    return (
      <div className="main">
        <Modal {...this.props} />
        <EventList {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    event: state.event
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getEventList: () => {
      socket.emit('new-alarm-events');
    },
    setEventList: (eventList) => {
      dispatch(setEventList(eventList));
    },
    setEvenViewed: (eventID) => {
      socket.emit('event-viewed', eventID);
      dispatch(setEvenViewed(eventID));
    },
    setEvenViewedAll: () => {
      socket.emit('event-viewed-all');
      dispatch(setEvenViewedAll());
    },
    recoveryEvent: () => {
      socket.emit('recovery-event');
    },
    showModal: (showEvent) => {
      dispatch(showModal(showEvent));
    },
    setCategory: (showEvent) => {
      socket.emit('set-category', showEvent);
      dispatch(setCategory(showEvent));
    },
    addEvent: (event) => {
      dispatch(addEvent(event));
    },
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
