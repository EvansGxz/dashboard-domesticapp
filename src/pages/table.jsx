import React, { useEffect, useRef } from "react"
import $ from 'jquery'
 
export function TblFunc(props) {
 
$.DataTable = require('datatables.net')
const tableRef = useRef()
 
useEffect(() => {
    console.log(tableRef.current)
    const table = $(tableRef.current).DataTable(
        {
            data: props.data,
                columns: [
                    { title: "Name"},
                    { title: "Position"},
                    { title: "Office"},
                    { title: "Extn."},
                    { title: "Start data"},
                    { title: "Salary"}
                ],
                destroy: true  // I think some clean up is happening here
        }
    )
    // Extra step to do extra clean-up.
    return function() {
        console.log("Table destroyed")
        table.destroy()
    }
},[props.data])
    return (
        <div>
            <table className="display" width="100%" ref={ tableRef }></table>
        </div>
         
    )
}