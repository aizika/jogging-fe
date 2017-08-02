import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';


function onAfterDeleteRow(rowKeys) {
  alert('The rowkey you drop: ' + rowKeys);
}

function onAfterSaveCell(row, cellName, cellValue) {
  let rowStr = '';
  for (const prop in row) {
    rowStr += prop + ': ' + row[prop] + ', ';
  }

  console.log('saving :\n' + rowStr);
}


function onBeforeSaveCell(row, cellName, cellValue) {
  if (cellName !== 'date') {
    return true;
  }
  const date = new Date(cellValue);
  if (isNaN(date)) {
    console.log('' + cellValue + ' is not a date.');
    return false;
  }
  return true;
}
function handleInsertedRow(row) {
  let rowStr = '';
  for (const prop in row) {
    rowStr += prop + ': ' + row[prop] + ', ';
  }

  console.log('saving :\n' + rowStr);
}

class RunsForm extends Component {

  constructor(props) {
    super(props);

    this.options = {
      defaultSortName: 'date',  // default sort column name
      defaultSortOrder: 'desc',  // default sort order
      afterDeleteRow: onAfterDeleteRow,
      afterSaveCell: onAfterSaveCell,
      beforeSaveCell: onBeforeSaveCell,
      afterInsertRow: handleInsertedRow,
    };
    this.selectRowProp =  { mode: 'checkbox'};
  }

  render = () => {
    return (
      <BootstrapTable data={this.props.runs}
                       deleteRow={ true }
                       insertRow={ true }
                       selectRow={ this.selectRowProp }
                       options={this.options}
      >
        <TableHeaderColumn dataField="id" isKey hiddenOnInsert autoValue >ID</TableHeaderColumn >
        <TableHeaderColumn dataField="date">Date</TableHeaderColumn >
        <TableHeaderColumn dataField="distance">Distance</TableHeaderColumn >
        <TableHeaderColumn dataField="duration">Duration</TableHeaderColumn >
      </BootstrapTable>);
  };
}

export default RunsForm;
