import { Card, CardContent, Container } from "@mui/material";

export const MainCard = ({
  children,
  containerRef,
}: {
  children: React.ReactNode;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) => {
  return (
    <Container
      maxWidth="md"
      ref={containerRef}
      sx={{ position: "relative", marginTop: { xs: 1, sm: 2 } }}
    >
      <Card sx={{ marginBottom: 5 }}>
        <CardContent sx={{ marginBottom: -2, marginTop: -1 }}>
          {children}{" "}
        </CardContent>
      </Card>
    </Container>
  );
};
