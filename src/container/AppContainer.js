import React from 'react';
import { connect } from 'react-redux';
import { setEventList , setEvenViewed , setEvenViewedAll } from '../redux/actions/action';
import EventList  from '../components/EventList';

import io from 'socket.io-client';

const socket = io('http://localhost:3001');

class AppContainer extends React.Component {
  componentWillMount(){
    const { setEventList } = this.props;
    socket.on('eventList', (eventList) => {
      setEventList(eventList);
    });
  }
  render() {
    const { event } = this.props;
    return (
      <div>
        <EventList {...this.props}/>
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
      socket.emit('event-viewed',eventID);
      dispatch(setEvenViewed(eventID));
    },
    setEvenViewedAll: () => {
      socket.emit('event-viewed-all');
      dispatch(setEvenViewedAll());
    },
    recoveryEvent: () => {
      socket.emit('recovery-event');
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
