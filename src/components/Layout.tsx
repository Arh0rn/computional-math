import { Container, Typography, Box } from "@mui/material";
import Header from "./Header";

const Layout = ({ title, children }: { title?: string; children: React.ReactNode }) => {
  return (
    <>
      <Header /> {/* ✅ Header is always displayed */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Container maxWidth="md" sx={{ padding: 3, backgroundColor: "white", borderRadius: 2, boxShadow: 3 }}>
          {title && (
            <Typography variant="h4" color="primary" gutterBottom>
              {title}
            </Typography>
          )}
          {children}
        </Container>
      </Box>
    </>
  );
};

export default Layout;
