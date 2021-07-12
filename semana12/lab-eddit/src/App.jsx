import React from "react";
import Router from "./routes/Router";
import GlobalContext from "./context/GlobalContext";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalContext>
        <Router/>
      </GlobalContext>
    </QueryClientProvider>
  );
}

export default App;
