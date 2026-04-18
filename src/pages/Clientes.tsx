import { useState, useEffect } from 'react'
import pb from '@/lib/pocketbase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Loader2 } from 'lucide-react'

export default function ClientesPage() {
  const [clientes, setClientes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchClientes() {
      try {
        const records = await pb.collection('_pb_users_auth_').getFullList({
          sort: '-created',
        })
        setClientes(records)
      } catch (error) {
        console.error('Error fetching clients', error)
      } finally {
        setLoading(false)
      }
    }

    fetchClientes()
  }, [])

  if (loading) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container py-12 space-y-8 animate-fade-in-up">
      <div>
        <h1 className="text-3xl font-serif text-white mb-2">Clientes</h1>
        <p className="text-muted-foreground font-light text-sm">
          Visão geral de clientes cadastrados no sistema.
        </p>
      </div>

      <Card className="bg-card border-white/5 rounded-none">
        <CardHeader className="border-b border-white/5 bg-white/[0.02] pb-4">
          <CardTitle className="text-lg font-serif text-white">Lista de Clientes</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableHead className="text-xs uppercase tracking-widest text-muted-foreground">
                  Nome
                </TableHead>
                <TableHead className="text-xs uppercase tracking-widest text-muted-foreground">
                  Email
                </TableHead>
                <TableHead className="text-xs uppercase tracking-widest text-muted-foreground text-right">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientes.map((cliente) => (
                <TableRow
                  key={cliente.id}
                  className="border-white/5 hover:bg-white/5 transition-colors"
                >
                  <TableCell className="py-4 font-medium text-sm text-white">
                    {cliente.name || 'N/A'}
                  </TableCell>
                  <TableCell className="py-4 text-sm text-muted-foreground">
                    {cliente.email}
                  </TableCell>
                  <TableCell className="text-right py-4 text-sm">
                    {cliente.is_active ? (
                      <span className="text-green-400">Ativo</span>
                    ) : (
                      <span className="text-red-400/80">Inativo</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {clientes.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                    Nenhum cliente encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
