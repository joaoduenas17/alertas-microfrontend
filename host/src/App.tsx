import { useEffect, useRef } from "react";

type AlertType = "exam" | "task" | "cancel";
type AcademicAlert = { type: AlertType; message: string };
type BusMessage = { kind: "ACADEMIC_ALERT"; payload: AcademicAlert };

export default function App() {
  const dashboardRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      const data = event.data as Partial<BusMessage>;

      if (!data || data.kind !== "ACADEMIC_ALERT" || !data.payload) return;

      dashboardRef.current?.contentWindow?.postMessage(data, "*");
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: "system-ui, Arial" }}>
      <h1>Shell / Host — Sistema de Alertas Académicas</h1>
      <p>
        El Host solo carga los microfrontends y reenvía mensajes (sin lógica de negocio).
      </p>

      <div style={{ display: "grid", gap: 16 }}>
        <iframe
          src="http://localhost:3001"
          title="mf-alert-sender"
          style={{
            width: "100%",
            height: 240,
            border: "2px solid #ddd",
            borderRadius: 12
          }}
        />

        <iframe
          ref={dashboardRef}
          src="http://localhost:3002"
          title="mf-alert-dashboard"
          style={{
            width: "100%",
            height: 240,
            border: "2px solid #ddd",
            borderRadius: 12
          }}
        />
      </div>
    </div>
  );
}
