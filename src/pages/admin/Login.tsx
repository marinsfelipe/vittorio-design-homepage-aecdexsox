import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import pb from '@/lib/pocketbase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { Loader2, ShieldCheck } from 'lucide-react'
import { extractFieldErrors } from '@/lib/pocketbase/errors'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await pb.send('/backend/v1/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })

      pb.authStore.save(res.token, res.record)

      toast({
        title: 'Login realizado com sucesso',
        description: 'Bem-vindo ao painel administrativo.',
      })
      navigate('/admin')
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Erro de autenticação',
        description: error.message || 'Credenciais inválidas ou acesso restrito.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card border-white/10 rounded-none shadow-2xl">
        <CardHeader className="text-center pb-8 border-b border-white/5 mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/20">
            <ShieldCheck className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-serif text-white tracking-wider">
            Acesso Restrito
          </CardTitle>
          <CardDescription className="text-muted-foreground font-light">
            Área administrativa Vittorio Design
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">
                Email Autorizado
              </label>
              <Input
                type="email"
                placeholder="contato@vittoriodesign.com.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-transparent border-white/10 text-white rounded-none h-12"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">
                Senha
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-transparent border-white/10 text-white rounded-none h-12"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-none h-12 uppercase tracking-widest text-sm transition-all"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Entrar no Dashboard'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
