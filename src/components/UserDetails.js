import React, { useRef, useCallback, useState, useEffect, useMemo } from "react";
import { AgGridReact } from 'ag-grid-react';

const UserDetails = ( props ) => {
    const formatDate = ( str_date ) => {
        if( str_date == '' ) {
            return '';
        }

        let date = new Date( str_date );
        
        return date.toLocaleDateString();
    }

    // const [userDetails, setUserDetails] = useState({
    //     id: 0,
    //     login: ' - ',
    //     url: ' - ',
    //     created_at: ' - '
    // });

    // const [repositories, setRepositories] = useState();

    const urlCellRenderer = (props) => {
        return <a className={ "repo__link" } href={ props.value }> {props.value} </a>
    }

    const [columnDefs] = useState([
        { headerName: "ID"  , field: 'id'     , resizable: true, width: 150 },
        { headerName: "Name", field: 'name'  , resizable: true, width: 150 },
        { headerName: "URL" , field: 'html_url', cellRenderer: urlCellRenderer  },
    ])

    const handleClickClose = () => {
        // props.closeDetailsFunc();
        // document.getElementsByClassName('userDetails__page')[0].style.display = 'none'

        props.handleClose()
    }

    const defaultColDef = useMemo(() => {
        return {
          editable: true,
          sortable: true,
          flex: 1,
          minWidth: 100,
          filter: true,
          resizable: true,
        };
      }, []);

    return (
        <div className={ "userDetails__page" } style={ props.display ? {} : {display: "none"} }>
            <div className={ "userDetails__container" } >
                <div className={ "userDetails__header" }>
                    <a className={ "userDetails__close" } onClick={ handleClickClose }> &times; </a>
                    <h1 className={ "userDetails__title" }> User Details - {props.userDetails?.login} </h1>
                    <hr className={ "userDetails__separator" }></hr>
                </div>

                <div className={"userDetails__info-container"}>
                    <div className={"userDetails__info"}>
                        <label className={ "userDetails__info--title" }> ID </label>
                        <span className={ "userDetails__info--data" }> { props.userDetails?.id } </span>
                    </div>
                    <div className={"userDetails__info"}>
                        <label className={ "userDetails__info--title" }> Login </label>
                        <span className={ "userDetails__info--data" }> { props.userDetails?.login } </span>
                    </div>
                    <div className={"userDetails__info"}>
                        <label className={ "userDetails__info--title" }> Url </label>
                        {/* <a className={ "userDetails__info--data" } href={props.userDetails?.url}> { props.userDetails?.url } </a> */}
                        <a className={ "userDetails__info--data" } href={'https://github.com/' + props.userDetails?.login}> { 'https://github.com/' + props.userDetails?.login } </a>
                    </div>
                    <div className={"userDetails__info"}>
                        <label className={ "userDetails__info--title" }> Created At </label>
                        <span className={ "userDetails__info--data" }> { formatDate(props.userDetails?.created_at) } </span>
                    </div>
                </div>

                <div className="ag-theme-alpine-dark userDetails__repos-container" >
                    <h2 className={ "userDetails__title" }> User Repositories </h2>
                    <hr className={ "userDetails__separator" }></hr>

                    <AgGridReact
                            rowData={ props.repositories }
                            columnDefs={ columnDefs }
                            defaultColDef={ defaultColDef }
                    >
                    </AgGridReact>
                </div>

            </div>
        </div>
    )
}

export default UserDetails;