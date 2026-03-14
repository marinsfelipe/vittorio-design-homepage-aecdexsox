import { useEffect, useState } from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { Loader2, ShieldAlert, LayoutDashboard, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'

const AUTHORIZED_EMAILS = [
  'felipe@vittoriodesign.com',
  'wellington@vittoriodesign.com',
  'parceiro@vittoriodesign.com',
]

export default function AdminLayout() {
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!session && location.pathname !== '/admin/login') {
    return <Navigate to="/admin/login" replace />
  }

  if (session && location.pathname === '/admin/login') {
    return <Navigate to="/admin" replace />
  }

  if (session && !AUTHORIZED_EMAILS.includes(session.user.email)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center p-4">
        <ShieldAlert className="w-16 h-16 text-destructive mb-4" />
        <h1 className="text-3xl font-serif text-white mb-2">Acesso Negado</h1>
        <p className="text-muted-foreground mb-6">
          Sua conta ({session.user.email}) não tem permissão para acessar o dashboard
          administrativo.
        </p>
        <Button
          onClick={() => supabase.auth.signOut()}
          variant="outline"
          className="border-white/20 text-white hover:bg-white/5"
        >
          Sair da Conta
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-primary selection:text-primary-foreground">
      {session && location.pathname !== '/admin/login' && (
        <header className="border-b border-white/10 bg-card sticky top-0 z-40">
          <div className="container flex items-center justify-between h-16">
            <div className="flex items-center gap-3 text-white">
              <LayoutDashboard className="w-5 h-5 text-primary" />
              <span className="font-serif text-lg tracking-wide">Admin Dashboard</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden sm:inline-block">
                {session.user.email}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => supabase.auth.signOut()}
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                title="Sair"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </header>
      )}
      <main className="flex-1">
        <Outlet context={{ session }} />
      </main>
    </div>
  )
}
