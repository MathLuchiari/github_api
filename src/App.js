import {React, useState, useEffect, useRef, useCallback, useMemo} from 'react';
import { AgGridReact } from 'ag-grid-react'; 
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import UsersList from './components/UsersList'
import UserDetails from './components/UserDetails'

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import './css/style.css';

import DetailsRenderer from './scripts/detailsRenderer.jsx';

import api from './api.js'

function App() {
  const [user, setUser] = useState();
  const [rowData, setRowData] = useState();
  const [displayDetails, setDisplayDetails] = useState( false );
  const [userDetails, setUserDetails] = useState({
      id: 0,
      login: ' - ',
      url: ' - ',
      created_at: ' - '
  });

  const [repositories, setRepositories] = useState();

  const closeDetails = () => {
    setDisplayDetails( false )
  }

  const updateUserDetails = ( userName ) => {
    console.log('updateUserDetails - ' + userName)
    api
    .get(`/api/users/${userName}/details`)
      .then((response) => setUserDetails(response.data))
      .catch((err) => {
        console.error("ops! something wnet wrong " + err);
      });
    }
    
  const updateRepositories = ( userName ) => {
    console.log('updateRepositories - ' + userName)
    api
      .get(`/api/users/${userName}/repos`)
      .then((response) => setRepositories(response.data))
      .catch((err) => {
        console.error("ops! something wnet wrong " + err);
      });
  }

  const [columnDefs] = useState([
      { headerName: "ID"   , field: 'id'     , resizable: true, width: 150 },
      { headerName: "Login", field: 'login'  , resizable: true, width: 150 },
      { headerName: ""     , field: 'details', cellRenderer: DetailsRenderer, cellRendererParams: {
          setUserDetail: ( userName ) => {
            console.log(userName)
            setUser( userName )
            updateUserDetails( userName )
            updateRepositories( userName )
            setDisplayDetails( true )
          }
        } 
      },
  ])

  //Make an API call to return the users list 
  useEffect(() => {
    api
      .get("/api/users")
      .then((response) => setRowData(response.data))
      .catch((err) => {
        console.error("ops! something wnet wrong " + err);
      });
  }, []);

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
    <div className="page__home">
        <div className={ "page__home__header" }>
            <h1 className={ "page__home__title" }> Users List </h1>
            <hr className={ "page__home__separator" }></hr>
        </div>

        <UsersList
          rowData={ rowData }
          columnDefs={ columnDefs }
          defaultColDef={ defaultColDef }
          pagination={ true }
          paginationPageSize={ 10 }
          // onGridReady={ autoSizeAll }
        />
        <UserDetails 
          userName={ user }
          display={ displayDetails }
          handleClose={ closeDetails }
          userDetails={ userDetails }
          repositories={ repositories }
        />
    </div>
  );
}

export default App;
