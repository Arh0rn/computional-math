import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <AppBar position="static" sx={{ m: 0, p: 0 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Computational Mathematics
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/task1">Task 1</Button>
        <Button color="inherit" component={Link} to="/task2">Task 2</Button>
        <Button color="inherit" component={Link} to="/task3">Task 3</Button>
        <Button color="inherit" component={Link} to="/task4">Task 4</Button>
        <Button color="inherit" component={Link} to="/task5">Task 5</Button>
        <Button color="inherit" component={Link} to="/task6">Task 6</Button>
        <Button color="inherit" component={Link} to="/task7">Task 7</Button>
        <Button color="inherit" component={Link} to="/task8">Task 8</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
