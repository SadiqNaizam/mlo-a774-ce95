import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Analytics from "./pages/Analytics";
import ClientManagement from "./pages/ClientManagement";
import Dashboard from "./pages/Dashboard";
import RFPDetailView from "./pages/RFPDetailView";
import RFPPipeline from "./pages/RFPPipeline";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


const App = () => (
<QueryClientProvider client={queryClient}>
    <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
        <Routes>


          <Route path="/" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/client-management" element={<ClientManagement />} />
          <Route path="/r-f-p-detail" element={<RFPDetailView />} />
          <Route path="/r-f-p-pipeline" element={<RFPPipeline />} />
          {/* catch-all */}
          <Route path="*" element={<NotFound />} />


        </Routes>
    </BrowserRouter>
    </TooltipProvider>
</QueryClientProvider>
);

export default App;
