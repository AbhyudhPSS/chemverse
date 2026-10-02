import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SiteLayout from "./components/layout/SiteLayout";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import ElementDetail from "./pages/ElementDetail";
import Learn from "./pages/Learn";
import LessonDetail from "./pages/LessonDetail";
import Class9 from "./pages/Class9";
import Class9Chapter from "./pages/Class9Chapter";
import Class10 from "./pages/Class10";
import Class10Chapter from "./pages/Class10Chapter";
import Class11 from "./pages/Class11";
import Class11Chapter from "./pages/Class11Chapter";
import Class12 from "./pages/Class12";
import Class12Chapter from "./pages/Class12Chapter";
import Quiz from "./pages/Quiz";
import Experiments from "./pages/Experiments";
import ExperimentDetail from "./pages/ExperimentDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <TooltipProvider delayDuration={200}>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<SiteLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/element/:atomicNumber" element={<ElementDetail />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/learn/:lessonId" element={<LessonDetail />} />
              <Route path="/class9" element={<Class9 />} />
              <Route path="/class9/:chapterId" element={<Class9Chapter />} />
              <Route path="/class10" element={<Class10 />} />
              <Route path="/class10/:chapterId" element={<Class10Chapter />} />
              <Route path="/class11" element={<Class11 />} />
              <Route path="/class11/:chapterId" element={<Class11Chapter />} />
              <Route path="/class12" element={<Class12 />} />
              <Route path="/class12/:chapterId" element={<Class12Chapter />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/experiments" element={<Experiments />} />
              <Route path="/experiments/:experimentId" element={<ExperimentDetail />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
