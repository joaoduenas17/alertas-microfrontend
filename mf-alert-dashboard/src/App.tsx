import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

type AlertType = "exam" | "task" | "cancel";

type AcademicAlert = {
  type: AlertType;
  message: string;
};

type BusMessage = {
  kind: "ACADEMIC_ALERT";
  payload: AcademicAlert;
};

const Container = styled.div`
  padding: 16px;
  border: 2px solid #ddd;
  border-radius: 12px;
  font-family: system-ui, Arial, sans-serif;
`;

const Title = styled.h2`
  margin: 0 0 12px 0;
`;

const Hint = styled.p`
  margin: 0;
  color: #444;
  font-weight: 500;
`;

const AlertBox = styled.div<{ bg: string }>`
  margin-top: 12px;
  padding: 14px;
  border-radius: 12px;
  color: #fff;
  font-weight: 800;
  background: ${(p) => p.bg};
`;

const Row = styled.div`
  margin-top: 6px;
  font-weight: 700;
`;

export default function App() {
  const [alert, setAlert] = useState<AcademicAlert | null>(null);

  const colors = useMemo<Record<AlertType, string>>(
    () => ({
      exam: "#1e40af", // azul
      task: "#15803d", // verde
      cancel: "#b91c1c" // rojo
    }),
    []
  );

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      const data = event.data as Partial<BusMessage>;

      if (!data || data.kind !== "ACADEMIC_ALERT" || !data.payload) return;

      setAlert(data.payload);
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  return (
    <Container>
      <Title>Microfrontend B — Alert Dashboard</Title>

      {!alert ? (
        <Hint>Esperando una alerta...</Hint>
      ) : (
        <AlertBox bg={colors[alert.type] ?? "#111"}>
          <Row>Tipo: {alert.type}</Row>
          <Row>Mensaje: {alert.message}</Row>
        </AlertBox>
      )}
    </Container>
  );
}
