import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";
import { WebSocketControl } from "./components/WebSocketControl";
import { QueueStatus } from "./components/QueueStatus";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <section id="center">
        <WebSocketControl />
        <QueueStatus />
      </section>
    </QueryClientProvider>
  );
}

export default App;
