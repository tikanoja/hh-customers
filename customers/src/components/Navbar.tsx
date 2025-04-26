import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

export const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Personal Trainer
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/customers"
            startIcon={<PeopleIcon />}
          >
            Customers
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/trainings"
            startIcon={<FitnessCenterIcon />}
          >
            Trainings
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};