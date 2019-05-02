import React from 'react';
import { connect } from 'react-redux';
import { CLEAR_ERROR } from '../actions';
import Snackbar from '@material-ui/core/Snackbar';

const mapStateToProps = (state) => ({msg: state.errorMsg});

const mapDispatchToProps = dispatch => ({
	clearError: () => dispatch({type: CLEAR_ERROR})
});

const ErrorSnackbar = ({ msg, clearError }) => {

	const handleClose = () => {
		clearError();
	}

  return (
    <Snackbar
    	anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
    	open={msg ? true : false}
    	message={<span id="error-message-snackbar"> {msg} </span>}
    	autoHideDuration={4000}
    	onClose={handleClose}
    	ContentProps={{
        'aria-describedby': 'error-message-snackbar',
      }} />
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorSnackbar);
