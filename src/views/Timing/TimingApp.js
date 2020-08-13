import React from "react";
import EditSection from "./components/EditSection";
import { MContextProvider } from "./context/AgendaContext";

function App() {
  return (
    <MContextProvider>
      <EditSection />
    </MContextProvider>
  );
}

export default App;