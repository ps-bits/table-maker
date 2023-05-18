import React, { useState } from 'react';


function TableMaker() {
  const [count, setCount] = useState(0);
  const [rows, setRows] = useState(11);
  const [cols, setCols] = useState(11);

  const changeRows = (e) => { setRows(e.currentTarget.value) }
  const changeCols = (e) => { setCols(e.currentTarget.value) }

  evaluateCode()

  return (
    <>
    
    <div id="table-config" className="field is-horizontal">

      <div className="field-body">

        <div className="field">
          <p className="control">
            <button className="button is-success is-small" style={{padding: "4px"}} onClick={() => {  evaluateCode(); setCount(count + 1); }}>Make Table</button>
          </p>
        </div>

        <div className="field has-addons">
          <div className="control">
            <a className="button is-static is-small">
              Rows
            </a>
          </div>
          <p className="control is-expanded">
            <input className="input is-small" type="text" placeholder="Name" value={rows} onChange={changeRows} />
          </p>
        </div>

        <div className="field has-addons">
          <div className="control">
            <a className="button is-static is-small">
              Cols
            </a>
          </div>
          <p className="control is-expanded">
            <input className="input is-small" type="text" placeholder="Name" value={cols} onChange={changeCols} />
          </p>
        </div>

      </div>
    </div>

    { count >= 0 &&
      <XTable rows={rows} cols={cols} />
    }

    </>
  )

}

export default TableMaker;


function evaluateCode() {
  var editor = window.ace.edit("editor");
  let annotations = editor.getSession().getAnnotations();

  let code = editor.getValue(); // or session.getValue

  if (annotations.length == 0) {
    console.log("no errors in code, doing eval");
    window.eval(code);
  }

}


function calculateCell(row, col) {
  return window.value(row, col);
}


function calculateCellColor(row, col) {
  return window.cellColor(row, col);
}


function XTable(props) {
  const {rows, cols} = props

  let tableRows = [];

  for (let i=0; i<rows; i++) {
    tableRows.push(<Row key={i} row={i} cols={cols} />)
  }

  return (
    <div className="">
    <table className="xtable">
      <tbody>
        <TopRow cols={cols}/>
        {tableRows}
      </tbody>
    </table>
    </div>
  )
}

function TopRow(props) {
  const {cols} = props
  let cells = [];
  cells.push(<td key="-1" className="tableIndex">x</td>)
  for (let i=0; i<cols; i++) {
    cells.push(<td key={i} className="tableIndex">{i}</td>)
  }
  return (<tr>{cells}</tr>)
}

function Row(props) {
  const {row, cols} = props

  let cells = [];
  cells.push(<td key="-1" className="tableIndex">{row}</td>)

  for (let i=0; i<cols; i++) {
    cells.push(<Cell key={i} row={row} col={i} />)
  }

  return (
    <tr>
      {cells}
    </tr>
  )
}


function Cell(props) {
  const {row, col} = props
  const value = calculateCell(row, col);
  const cellColor = calculateCellColor(row, col);
  return (
    <td style={{backgroundColor: cellColor}}>
      {value}
    </td>
  )
}
