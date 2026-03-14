import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import Index from './pages/Index'
import Sobre from './pages/Sobre'
import Catalogo from './pages/Catalogo'
import Loja from './pages/Loja'
import Carrinho from './pages/Carrinho'
import Checkout from './pages/Checkout'
import Success from './pages/Success'
import Produto from './pages/Produto'
import Contato from './pages/Contato'
import Rastreio from './pages/Rastreio'
import Galeria from './pages/Galeria'
import Documentacao from './pages/Documentacao'
import Orcamento from './pages/Orcamento'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import FAQ from './pages/FAQ'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'
import { initGA, trackPageView } from './lib/analytics'

initGA()

function AnalyticsTracker() {
  const location = useLocation()

  useEffect(() => {
    trackPageView(location.pathname + location.search)
  }, [location])

  return null
}

const App = () => (
  <BrowserRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
    <AnalyticsTracker />
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Index />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/loja" element={<Loja />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/produto/:id" element={<Produto />} />
          <Route path="/galeria" element={<Galeria />} />
          <Route path="/rastreio" element={<Rastreio />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/documentacao" element={<Documentacao />} />
          <Route path="/orcamento" element={<Orcamento />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </BrowserRouter>
)

export default App
