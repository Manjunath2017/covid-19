import React,{Component, Fragment} from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import Chip from '@material-ui/core/Chip';
import { emphasize, withStyles } from '@material-ui/core/styles';

const StyledBreadcrumb = withStyles((theme) => ({
  root: {
    backgroundColor: "#3f51b5",
    height: theme.spacing(5),
    padding:"6px",

    // color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      // backgroundColor: theme.palette.grey[300],
      cursor: "pointer"
    },
    '&:active': {
      // boxShadow: theme.shadows[1],
      // backgroundColor: emphasize(theme.palette.grey[300], 0.12),

    },
  },
}))(Chip);

class Footer extends Component {
  render() {
    return (
    <Fragment>
      <Breadcrumbs aria-label="breadcrumb" style={{backgroundColor:"#3f51b5", color:"#FFF"}}>
        <StyledBreadcrumb component="a" href="https://www.facebook.com/manjunathjadhavMJ" label="Facebook" color="secondary" icon={<FacebookIcon fontSize="small" />} />
        <StyledBreadcrumb component="a" href="https://www.instagram.com/callmemj7/" label="Instagram" color="secondary" icon={<InstagramIcon fontSize="small" />} />
      </Breadcrumbs>
    </Fragment>
    );
  }
}
export default Footer;