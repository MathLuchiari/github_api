import React, { useRef, useCallback } from "react";
import { AgGridReact } from 'ag-grid-react';

const UsersList = ( props ) => {
    const gridRef = useRef();

    return (
        <div className="ag-theme-alpine-dark users__list" >
           <AgGridReact
                rowData={ props.rowData }
                columnDefs={ props.columnDefs }
                defaultColDef={ props.defaultColDef }
                pagination={ props.pagination}
                paginationPageSize={ props.paginationPageSize}>
           </AgGridReact>
       </div>
    )
}

export default UsersList;