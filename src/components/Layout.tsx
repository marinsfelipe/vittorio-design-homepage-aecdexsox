import { Link, Outlet, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { MapPin, Phone, Mail, Instagram, Menu, X, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import logoPrimary from '../assets/logo-png-ade0b.png'
import logoBoxed from '../assets/logotipo-vittorio-2d1d7.jpg'

export function Layout() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'Sobre', path: '/sobre' },
    { name: 'Catálogo', path: '/catalogo' },
    { name: 'Projetos', path: '/galeria' },
    { name: 'Contato', path: '/contato' },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 font-sans text-zinc-300">
      <header
        className={cn(
          'fixed top-0 z-50 w-full transition-all duration-300 border-b',
          isScrolled
            ? 'bg-zinc-950/90 backdrop-blur-md border-zinc-800 shadow-sm shadow-black/50'
            : 'bg-transparent border-transparent',
        )}
      >
        <div className="container mx-auto px-4 h-24 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={logoPrimary}
              alt="Vittorio"
              className="h-14 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm font-medium tracking-wide text-zinc-300 hover:text-[#D4AF37] transition-colors uppercase"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button
              asChild
              className="bg-[#D4AF37] hover:bg-[#B8860B] text-zinc-950 rounded-none font-semibold uppercase tracking-wider text-xs px-6"
            >
              <Link to="/orcamento">Orçamento</Link>
            </Button>
          </div>

          <button
            className="md:hidden p-2 text-zinc-300 hover:text-[#D4AF37] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden absolute top-24 left-0 w-full bg-zinc-950 border-b border-zinc-800 shadow-xl py-4 flex flex-col px-6 animate-in slide-in-from-top-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="py-4 text-zinc-300 hover:text-[#D4AF37] border-b border-zinc-900 last:border-0 uppercase text-sm tracking-widest font-medium"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-6 pb-2">
              <Button
                asChild
                className="w-full bg-[#D4AF37] hover:bg-[#B8860B] text-zinc-950 rounded-none uppercase tracking-wider h-12"
              >
                <Link to="/orcamento">Solicitar Orçamento</Link>
              </Button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow flex flex-col w-full min-h-[calc(100vh-6rem)]">
        <Outlet />
      </main>

      <footer className="bg-[#050505] border-t border-zinc-900 pt-20 pb-8 text-zinc-400">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
            <div className="flex flex-col items-start lg:pr-8">
              <div className="bg-zinc-950 p-3 rounded-sm mb-6 border border-zinc-800 shadow-lg">
                <img
                  src={logoBoxed}
                  alt="Vittorio"
                  className="h-24 w-auto object-cover rounded-sm"
                />
              </div>
              <p className="text-sm text-zinc-500 mb-6 leading-relaxed font-light">
                Criar ambientes funcionais e elegantes para aumento de vendas. Soluções premium em
                refrigeração e montagem comercial.
              </p>
              <p className="text-xs text-zinc-600 font-mono tracking-wider">
                CNPJ: 24.810.002/0001-04
              </p>
            </div>

            <div>
              <h4 className="text-[#D4AF37] text-sm font-bold uppercase tracking-[0.15em] mb-8">
                Navegação
              </h4>
              <ul className="space-y-4 text-sm">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="hover:text-[#D4AF37] transition-colors flex items-center gap-3 group font-light"
                    >
                      <ChevronRight className="h-4 w-4 text-zinc-700 group-hover:text-[#D4AF37] transition-colors" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[#D4AF37] text-sm font-bold uppercase tracking-[0.15em] mb-8">
                Contato Oficial
              </h4>
              <ul className="space-y-6 text-sm">
                <li className="flex items-start gap-4">
                  <div className="bg-zinc-900 p-2 rounded-full border border-zinc-800 shrink-0">
                    <MapPin className="h-4 w-4 text-[#D4AF37]" />
                  </div>
                  <span className="leading-relaxed text-zinc-300 font-light mt-1">
                    Avenida Virginia Paula dos Santos Alves, 1840
                    <br />
                    Itaboraí - RJ, CEP 24.867-512
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="bg-zinc-900 p-2 rounded-full border border-zinc-800 shrink-0">
                    <Phone className="h-4 w-4 text-[#D4AF37]" />
                  </div>
                  <a
                    href="https://wa.me/5521990451568"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-300 hover:text-[#D4AF37] transition-colors font-light text-base"
                  >
                    (21) 99045-1568
                  </a>
                </li>
                <li className="flex items-center gap-4">
                  <div className="bg-zinc-900 p-2 rounded-full border border-zinc-800 shrink-0">
                    <Mail className="h-4 w-4 text-[#D4AF37]" />
                  </div>
                  <a
                    href="mailto:contato@vittoriodesign.com.br"
                    className="text-zinc-300 hover:text-[#D4AF37] transition-colors font-light"
                  >
                    contato@vittoriodesign.com.br
                  </a>
                </li>
              </ul>
              <div className="mt-10 flex gap-4">
                <a
                  href="https://instagram.com/VittorioDesignOficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-12 w-12 rounded-full border border-zinc-800 bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all group"
                >
                  <Instagram className="h-5 w-5 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-zinc-600 font-light">
            <p>&copy; {new Date().getFullYear()} Vittorio. Todos os direitos reservados.</p>
            <div className="flex gap-6 mt-4 md:mt-0 uppercase tracking-widest text-[10px]">
              <Link to="/privacidade" className="hover:text-[#D4AF37] transition-colors">
                Política de Privacidade
              </Link>
              <Link to="/termos" className="hover:text-[#D4AF37] transition-colors">
                Termos de Serviço
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
