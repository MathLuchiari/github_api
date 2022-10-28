import React from 'react';

// import { userDetails } from '../components/UserDetails'

export default (props) => {
  const cellValue = props.valueFormatted ? props.valueFormatted : props.value;

  const buttonClicked = () => {
    // console.log( props.data.login );

    // getUserRepos( props.data.login )
    props.setUserDetail( props.data.login )
    // document.getElementsByClassName('userDetails__page')[0].style.display = 'flex'
  };

  return (
    <span>
      <span>{cellValue}</span>&nbsp;
      <button onClick={() => buttonClicked()}> Details </button>
    </span>
  );
};