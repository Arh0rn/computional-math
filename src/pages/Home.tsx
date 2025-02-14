import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Typography variant="h4" color="primary" sx={{ mb: 2 }}>
        Computational Mathematics App
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        Interactive tools for solving computational math problems.
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 2,
          mt: 3,
        }}
      >
        <Link to="/task1"><Button variant="contained" fullWidth>Task 1: Graphical Method</Button></Link>
        <Link to="/task2"><Button variant="contained" fullWidth>Task 2: Root-Finding</Button></Link>
        <Link to="/task3"><Button variant="contained" fullWidth>Task 3: Jacobi Method</Button></Link>
        <Link to="/task4"><Button variant="contained" fullWidth>Task 4: Matrix Inversion</Button></Link>
        <Link to="/task5"><Button variant="contained" fullWidth>Task 5: Linear Curve Fitting</Button></Link>
        <Link to="/task6"><Button variant="contained" fullWidth>Task 6: Newton’s Forward Diff.</Button></Link>
        <Link to="/task7"><Button variant="contained" fullWidth>Task 7: Taylor Series</Button></Link>
        <Link to="/task8"><Button variant="contained" fullWidth>Task 8: Simpson’s 3/8 Rule</Button></Link>
      </Box>
    </>
  );
}
