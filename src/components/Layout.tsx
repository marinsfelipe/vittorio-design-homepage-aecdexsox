import { useState, useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Menu, Instagram, Mail, Phone, MapPin, MessageCircle } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function Layout() {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Catálogo', path: '/catalogo' },
    { name: 'Contato', path: '/contato' },
  ]

  const whatsappMessage = encodeURIComponent('Olá! Gostaria de uma informação.')
  const whatsappUrl = `https://wa.me/5521990451568?text=${whatsappMessage}`

  return (
    <div className="flex flex-col min-h-screen selection:bg-primary selection:text-primary-foreground relative">
      <header
        className={cn(
          'fixed top-0 w-full z-40 transition-all duration-300 glass-header',
          scrolled ? 'py-3 bg-background/80 backdrop-blur-md border-b border-white/5' : 'py-6',
        )}
      >
        <div className="container flex items-center justify-between">
          <Link to="/" className="text-2xl font-serif font-bold text-white tracking-wider">
            VITTORIO <span className="text-primary font-normal text-xl">Design</span>
          </Link>

          <nav className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  'text-sm font-medium uppercase tracking-widest nav-link-hover pb-1 transition-colors',
                  location.pathname === link.path
                    ? 'text-primary'
                    : 'text-foreground hover:text-white',
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-white hover:text-primary">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-background border-l-border/50 flex flex-col pt-16 z-50"
            >
              <SheetTitle className="sr-only">Menu de Navegação</SheetTitle>
              <SheetDescription className="sr-only">
                Acesse as páginas da Vittorio Design
              </SheetDescription>
              <nav className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={cn(
                      'text-2xl font-serif tracking-wide transition-colors',
                      location.pathname === link.path
                        ? 'text-primary'
                        : 'text-foreground hover:text-white',
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto pb-8 flex gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-border rounded-full hover:border-primary hover:text-primary transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-border rounded-full hover:border-primary hover:text-primary transition-colors"
                >
                  <MessageCircle className="h-5 w-5" />
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-card border-t border-white/5 pt-16 pb-8">
        <div className="container grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-serif text-white mb-4">VITTORIO</h3>
            <p className="text-muted-foreground leading-relaxed text-sm max-w-xs">
              Mobiliário exclusivo e design de interiores sofisticado. Transformamos ambientes
              através da excelência do inox e acabamentos premium.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-serif text-white mb-4 uppercase tracking-wider">
              Links Rápidos
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-serif text-white mb-4 uppercase tracking-wider">Contato</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground text-sm hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4 text-primary" />
                  <span>+55 (21) 99045-1568</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contato@vittoriodesign.com"
                  className="flex items-center gap-3 text-muted-foreground text-sm hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4 text-primary" />
                  <span>contato@vittoriodesign.com</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Av. Europa, 150 - São Paulo, SP</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="container pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Vittorio Design. Todos os direitos reservados.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors flex items-center gap-2"
            >
              <Instagram className="h-4 w-4" /> Instagram
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors flex items-center gap-2"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 p-4 bg-primary text-primary-foreground rounded-full shadow-[0_4px_20px_rgba(201,162,107,0.3)] hover:bg-primary/90 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center group"
        aria-label="Fale conosco no WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute right-full mr-4 bg-card border border-white/10 text-white text-sm px-3 py-1.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
          Fale Conosco
        </span>
      </a>
    </div>
  )
}
