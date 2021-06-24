import React from "react";
import Router from "./routes/Router";
import GlobalStates from "./global/GlobalStates";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStates>
        <Router/>
      </GlobalStates>
    </QueryClientProvider>
  );
}

export default App;
