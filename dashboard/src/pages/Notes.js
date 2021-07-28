import { Helmet } from "react-helmet";
import { Box, Container } from "@material-ui/core";
import NotesToolbar from "src/components/notes/NotesToolbar";

const Notes = () => (
  <>
    <Helmet>
      <title>Customers </title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100%",
        py: 3,
      }}
    >
      <Container maxWidth={false}>
        <NotesToolbar />
      </Container>
    </Box>
  </>
);

export default Notes;
