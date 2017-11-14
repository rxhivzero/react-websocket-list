import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { log } from 'util';

class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectList: [],
      selectAll: false
    }
    this.onRowSelect = this.onRowSelect.bind(this);
    this.onSelectAll = this.onSelectAll.bind(this);
    this.setViewed = this.setViewed.bind(this);
  }
  onRowSelect(row, isSelected, e) {
    const { showModal , event } = this.props;
    const { eventList } = event;
    let filterEvent = eventList.filter(event => {
      return event.event_id === row.event_id;
    });
    filterEvent[0].viewed = isSelected;
    showModal(row);
    this.setState({
      selectList: eventList
    });
  }
  onSelectAll(isSelected, rows) {
    this.setState({
      selectAll: isSelected,
    });
  }
  setViewed() {
    const { selectList, selectAll } = this.state;
    const { setEvenViewed, setEvenViewedAll } = this.props;
    if (selectAll) {
      setEvenViewedAll();
    } else if (selectList.length !== 0) {
      selectList.map((event, index) => {
        if (event.viewed) {
          setEvenViewed(event.event_id);
        }
      })
    }
  }
  imageFormatter(cell, row) {
    return `<img src='${cell}' height="100" width="200"/>`;
  }
  render() {
    const { getEventList, recoveryEvent } = this.props;
    const { eventList } = this.props.event;
    const selectRowProp = {
      mode: 'checkbox',
      clickToSelect: true,
      bgColor: 'lightskyblue',
      onSelect: this.onRowSelect,
      onSelectAll: this.onSelectAll
    };
    return (
      <div>
        <button className="btn btn-info" onClick={this.setViewed}>已讀勾選項目</button>
        <button className="btn btn-info" onClick={() => { getEventList() }}>取得server未讀資料</button>
        <button className="btn btn-info" onClick={() => { recoveryEvent() }}>復原server未讀資料</button>

        <BootstrapTable height='400px' data={eventList} selectRow={selectRowProp} >
          <TableHeaderColumn dataField="event_id" isKey={true} dataAlign="center" dataSort={true}>event_id</TableHeaderColumn>
          <TableHeaderColumn dataField="camera_id" dataAlign="center">camera_id</TableHeaderColumn>
          <TableHeaderColumn dataField="starting_timestamp" dataAlign="center" dataSort={true}>starting_timestamp</TableHeaderColumn>
          <TableHeaderColumn dataField="category" dataAlign="center">category</TableHeaderColumn>
          <TableHeaderColumn dataField="prediction" dataAlign="center">prediction</TableHeaderColumn>
          <TableHeaderColumn dataField="thumbnail" dataAlign="center" dataFormat={this.imageFormatter}>thumbnail</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default EventList;
