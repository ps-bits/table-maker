import React, { useState } from 'react';


function TableMaker() {
  const [count, setCount] = useState(0);
  const [rows, setRows] = useState(6);
  const [cols, setCols] = useState(6);

  const changeRows = (e) => { setRows(e.currentTarget.value) }
  const changeCols = (e) => { setCols(e.currentTarget.value) }

  calculate()

  return (
    <>
    
    <div className="field is-horizontal">
      <div className="field-label is-normal">
        <label className="label">Size</label>
      </div>
      <div className="field-body">

        <div className="field">
          <p className="control is-expanded">
            <input className="input" type="text" placeholder="Name" value={rows} onChange={changeRows} />
          </p>
        </div>

        <div className="field">
          <p className="control is-expanded">
            <input className="input" type="text" placeholder="Name" value={cols} onChange={changeCols} />
          </p>
        </div>

      </div>
    </div>

    <button className="button is-dark" style={{padding: "4px"}} onClick={() => { setCount(count + 1); calculate(); }}>Make Table</button>

    { count >= 0 &&
      <XTable rows={rows} cols={cols} />
    }

    </>
  )

}

export default TableMaker;


function calculate() {
  var editor = window.ace.edit("editor");
  let annotations = editor.getSession().getAnnotations()

  let code = editor.getValue(); // or session.getValue

  if (annotations.length == 0) {
    console.log("no errors in code, doing eval")
    window.eval(code)
    window.foo(3)
  }

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
  cells.push(<td className="tableIndex">x</td>)
  for (let i=0; i<cols; i++) {
    cells.push(<td className="tableIndex">{i}</td>)
  }
  return (<tr>{cells}</tr>)
}

function Row(props) {
  const {row, cols} = props

  let cells = [];
  cells.push(<td className="tableIndex">{row}</td>)

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
  const value = window.foo(row, col)
  return (
    <td>
      {value}
    </td>
  )
}
