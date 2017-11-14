var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
});

let eventList = [];
[...Array(10)].map((event, index) => {
  const date = new Date();
  date.setSeconds(index);
  eventList.push({
    event_id: index,
    camera_id: index,
    starting_timestamp: date.toLocaleString(),
    prediction: 'car',
    category:'people',
    thumbnail: 'https://i.imgur.com/2kMzC4g.png',
    viewed: false
  })
})

eventList = eventList.sort(function (a, b) {
  return new Date(b.starting_timestamp) - new Date(a.starting_timestamp);
})

io.on('connection', function (socket) {

  socket.emit('eventList', eventList);

  socket.on('new-alarm-events', function () {
    eventList = eventList.filter(event => {
      return event.viewed !== true;
    });
    socket.emit('eventList', eventList);
  });

  socket.on('event-viewed-all', function () {
    eventList.map((event, index) => {
      event.viewed = true;
    })
  });

  socket.on('event-viewed', function (eventID) {
    let filterEvent = eventList.filter(event => {
      return event.event_id === eventID;
    });
    filterEvent[0].viewed = true;
  });

  socket.on('recovery-event', function () {
    eventList = [];
    [...Array(10)].map((event, index) => {
      const date = new Date();
      date.setSeconds(index);
      eventList.push({
        event_id: index,
        camera_id: index,
        starting_timestamp: date.toLocaleString(),
        prediction: 'car',
        thumbnail: 'https://i.imgur.com/2kMzC4g.png',
        viewed: false
      })
    })
    eventList = eventList.sort(function (a, b) {
      return new Date(b.starting_timestamp) - new Date(a.starting_timestamp);
    })
    socket.emit('eventList', eventList);
  });
  setInterval(function(){
    const index = eventList.length+1;
    const date = new Date();
    date.setSeconds(index);
    const event = {
      event_id: index,
      camera_id: index,
      starting_timestamp: date.toLocaleString(),
      prediction: 'car',
      category:'people',
      thumbnail: 'https://i.imgur.com/2kMzC4g.png',
      viewed: false
    }
    eventList.push(event)
    eventList = eventList.sort(function (a, b) {
      return new Date(b.starting_timestamp) - new Date(a.starting_timestamp);
    })
    socket.emit('addEvent', event);
  }, 3000);

  socket.on('set-category', function (showEvent) {
    eventList = eventList.filter(event => {
      if(event.event_id === showEvent.event_id){
        event.category = showEvent.category;
      }
      return event;
    });
    console.log(showEvent);
  });

  socket.on('disconnect', function () {
  });
});

http.listen(3001);