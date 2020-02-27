import InputBase from '@material-ui/core/InputBase';
import { makeStyles, withStyles } from "@material-ui/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";


export const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginRight: theme.spacing(1),
    },
  },
  input: {
    borderRadius: 8,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '12px 26px 12px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      backgroundColor: theme.palette.background.paper
    },
  },
}))(InputBase);

export const HeaderInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginLeft: theme.spacing(2),
    },
  },
  input: {
    color:'#fff',
    borderRadius: 4,
    position: 'relative',
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '5px 26px 5px 12px',
    backgroundColor: fade(theme.palette.common.black, 0),
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      backgroundColor: fade(theme.palette.common.black, 0.08),
    },
  },
}))(InputBase);

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
}));
