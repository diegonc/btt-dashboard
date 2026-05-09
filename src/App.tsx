import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";
import { QueueStatus } from "./components/QueueStatus";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <section id="center">
        <QueueStatus />
      </section>
    </QueryClientProvider>
  );
}

export default App;
