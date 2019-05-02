import React from 'react';
import { connect } from 'react-redux';
import { changeTheme } from '../../actions';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const mapStateToProps = (state) => ({
  selected: state.theme
});

const mapDispatchToProps = {
  onThemeSelect: changeTheme
}

const ThemeContainer = ({ selected, onThemeSelect }) => {
  const themes = ['dark', 'light'];
  const items = themes.map(theme => <MenuItem key={theme} value={theme}>{theme.charAt(0).toUpperCase() + theme.slice(1)}</MenuItem>);

  return (
    <form>
      <FormControl fullWidth>
        <InputLabel htmlFor="theme">Theme</InputLabel>
        <Select
          value={selected}
          onChange={ event => onThemeSelect(event.target.value) }>
          {items}
        </Select>
      </FormControl>
    </form>
  );
}

ThemeContainer.propTypes = {
  selected: PropTypes.string,
  onThemeSelect: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(ThemeContainer);