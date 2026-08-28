import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { MotionConfig } from "framer-motion";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { Layout } from "./components/layout/Layout";
import { ThemeProvider } from "./contexts/ThemeContext";
import { DonationProvider } from "./contexts/DonationContext";
import Home from "./pages/Home";
import Roadmap from "./pages/Roadmap";
import Donations from "./pages/Donations";
import Transparency from "./pages/Transparency";
import Guide from "./pages/Guide";
import Demo from "./pages/Demo";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/roadmap"} component={Roadmap} />
      <Route path={"/donations"} component={Donations} />
      <Route path={"/transparency"} component={Transparency} />
      <Route path={"/guide"} component={Guide} />
      <Route path={"/demo"} component={Demo} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <MotionConfig reducedMotion="user">
          <TooltipProvider>
            <DonationProvider>
              <Toaster />
              <Layout>
                <Router />
              </Layout>
            </DonationProvider>
          </TooltipProvider>
        </MotionConfig>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
