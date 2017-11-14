import React from 'react';
import { log } from 'util';
import { loadavg } from 'os';

class EventList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { showModal, setCategory ,event } = this.props;
    const hidden = (event.showModal) ? '' : 'hidden';
    const { showEvent } = event;
    const categoryList = ['people' , 'car' , 'animal' , 'other'];
    return (
      <div className={'modalDialog ' + hidden}>
        <div>
          <button className="colse" onClick={showModal}>X</button>
          <div className="content">
            <div className="icon"><img src={showEvent.thumbnail} height="150" width="200"/></div>
            <div className="info">
              <div>{'event_id:'+showEvent.event_id}</div>
              <div>{'camera_id:'+showEvent.camera_id}</div>
              <div className="category">
                {
                  categoryList.map(function(name) {
                    return(
                      <button key={name} className={ showEvent.category === name?'show':'' }
                        onClick={()=>{ 
                          showEvent.category = name;
                          setCategory(showEvent)
                        }}
                      >
                      {name}</button>
                    )
                 })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EventList;
