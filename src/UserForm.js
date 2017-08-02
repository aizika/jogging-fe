import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';


function onAfterDeleteRow(rowKeys) {
  console.log('drop: ' + rowKeys);
}

function onAfterSaveCell(row, cellName, cellValue) {
  let rowStr = '';
  for (const prop in row) {
    rowStr += prop + ': ' + row[prop] + ', ';
  }

  console.log('saving :\n' + rowStr);
}

const roles = ['user', 'manager', 'admin'];

function onBeforeSaveCell(row, cellName, cellValue) {
  if (cellName !== 'role') {
    return true;
  }
  if (!roles.includes(cellValue)) {
    alert('Role should be one of: ' + roles.toString());
    return false;
  }
  return true;
}
const cellEditProp = {
  mode: 'dbclick',
  blurToSave: true,
  beforeSaveCell: onBeforeSaveCell, // a hook for before saving cell
  afterSaveCell: onAfterSaveCell  // a hook for after saving cell
};

class UserForm extends Component {

  constructor(props) {
    super(props);

    this.options = {
      defaultSortName: 'username',  // default sort column name
      afterDeleteRow: onAfterDeleteRow,
      afterSaveCell: onAfterSaveCell,
      beforeSaveCell: onBeforeSaveCell
    };
    this.selectRowProp =  { mode: 'checkbox'};
  }


  render = () => {
    return (
      <BootstrapTable data={this.props.users}
                      cellEdit={ cellEditProp }
                      deleteRow={ true }
                      insertRow={ true }
                      selectRow={ this.selectRowProp }
                      options={this.options}>
        <TableHeaderColumn dataField="id" isKey hiddenOnInsert autoValue >ID</TableHeaderColumn >
        <TableHeaderColumn dataField="username" >username</TableHeaderColumn >
        <TableHeaderColumn dataField="role" >role</TableHeaderColumn >
        <TableHeaderColumn dataField="email">email</TableHeaderColumn >
        <TableHeaderColumn dataField="password">password</TableHeaderColumn >
      </BootstrapTable>);
  };
}

export default UserForm;
