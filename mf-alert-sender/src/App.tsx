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

const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const Button = styled.button`
  padding: 10px 14px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
  background: #111;
  color: #fff;

  &:active {
    transform: scale(0.98);
  }
`;

const Hint = styled.p`
  margin: 10px 0 0;
  color: #444;
  font-weight: 500;
`;

function sendAlert(type: AlertType) {
  const map: Record<AlertType, string> = {
    exam: "📘 Alerta: Tienes un examen próximo.",
    task: "✅ Alerta: Tienes una tarea pendiente.",
    cancel: "⛔ Alerta: La clase fue cancelada."
  };

  const payload: AcademicAlert = { type, message: map[type] };
  const msg: BusMessage = { kind: "ACADEMIC_ALERT", payload };

  window.parent.postMessage(msg, "*");
}

export default function App() {
  return (
    <Container>
      <Title>Microfrontend A — Alert Sender</Title>

      <ButtonRow>
        <Button onClick={() => sendAlert("exam")}>Examen</Button>
        <Button onClick={() => sendAlert("task")}>Tarea</Button>
        <Button onClick={() => sendAlert("cancel")}>Clase cancelada</Button>
      </ButtonRow>

      <Hint>Presiona un botón y el Dashboard debe actualizarse inmediatamente.</Hint>
    </Container>
  );
}
