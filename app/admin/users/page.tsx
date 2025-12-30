'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Label } from '@/components/ui/label'
import { Search, User, Star, Calendar, Mail, Shield, Trash2, Download } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  email: string
  name: string | null
  subscriptionStatus: string
  subscriptionExpiresAt: string | null
  createdAt: string
  updatedAt: string
  birthDataChangeCount: number
  hasDraconicAccess: boolean
  subscription?: {
    hasBaseBundle: boolean
    hasLunarCalendar: boolean
    hasAstrogematria: boolean
    hasElectiveChart: boolean
  }
}

export default function AdminUsersPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])

  // Growth / Marketing CSV Export
  const downloadCSV = () => {
    const headers = [
      'ID',
      'Name',
      'Email',
      'Join Date',
      'Status',
      'Has Base Bundle',
      'Has Lunar Calendar',
      'Has Astrogematria',
      'Has Elective Chart',
      'Has Draconic (Lifetime)'
    ];

    const rows = users.map(user => [
      user.id,
      user.name || '',
      user.email,
      new Date(user.createdAt).toISOString().split('T')[0],
      user.subscriptionStatus,
      user.subscription?.hasBaseBundle ? 'YES' : 'NO',
      user.subscription?.hasLunarCalendar ? 'YES' : 'NO',
      user.subscription?.hasAstrogematria ? 'YES' : 'NO',
      user.subscription?.hasElectiveChart ? 'YES' : 'NO',
      user.hasDraconicAccess ? 'YES' : 'NO'
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(field => `"${field}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `astro_users_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)
  const [deleting, setDeleting] = useState(false)

  // Verificar si el usuario es admin
  useEffect(() => {
    if (status === 'loading') return

    if (!session || session.user?.email !== 'info@astrochat.online') {
      router.push('/')
      return
    }

    fetchUsers()
  }, [session, status, router])

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users')
      if (response.ok) {
        const data = await response.json()
        setUsers(data.users)
      }
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateUserSubscription = async (userId: string, subscriptionStatus: string, expiresAt?: string) => {
    setUpdating(true)
    try {
      const response = await fetch(`/api/admin/users/${userId}/subscription`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscriptionStatus,
          subscriptionExpiresAt: expiresAt || null,
        }),
      })

      if (response.ok) {
        await fetchUsers() // Recargar la lista
        setIsDialogOpen(false)
        setSelectedUser(null)
      }
    } catch (error) {
      console.error('Error updating subscription:', error)
    } finally {
      setUpdating(false)
    }
  }

  const resetBirthDataCounter = async (userId: string) => {
    if (!confirm("¿Estás seguro de que quieres reiniciar el contador de cambios para este usuario?")) return;

    setUpdating(true)
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resetCounter: true,
        }),
      })

      if (response.ok) {
        await fetchUsers() // Recargar la lista
        setIsDialogOpen(false)
        setSelectedUser(null)
        alert("Contador reiniciado exitosamente.")
      } else {
        alert("Error al reiniciar contador.")
      }
    } catch (error) {
      console.error('Error resetting counter:', error)
      alert("Error al reiniciar contador.")
    } finally {
      setUpdating(false)
    }
  }

  const deleteUser = async (userId: string) => {
    setDeleting(true)
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        await fetchUsers() // Recargar la lista
        setIsDeleteDialogOpen(false)
        setUserToDelete(null)
        setIsDialogOpen(false)
        setSelectedUser(null)
      } else {
        const data = await response.json()
        alert(data.error || 'Error al eliminar usuario')
      }
    } catch (error) {
      console.error('Error deleting user:', error)
      alert('Error al eliminar usuario')
    } finally {
      setDeleting(false)
    }
  }

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'premium':
        return <Badge className="bg-yellow-500 text-yellow-900">Premium ⭐</Badge>
      case 'free':
        return <Badge variant="secondary">Gratuito</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      </div>
    )
  }

  if (!session || session.user?.email !== 'info@astrochat.online') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <Shield className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Acceso Denegado</h1>
          <p className="text-muted-foreground">No tienes permisos para acceder a esta página.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Shield className="h-8 w-8 text-purple-600" />
          Panel de Administración - Usuarios
        </h1>
        <p className="text-muted-foreground">
          Gestiona las suscripciones y permisos de los usuarios de Astrochat
        </p>
      </div>

      <div className="flex justify-end mb-6">
        <Button onClick={downloadCSV} variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Descargar CSV (Marketing)
        </Button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Premium</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter(u => u.subscriptionStatus === 'premium').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Gratuitos</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter(u => u.subscriptionStatus === 'free').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nuevos Esta Semana</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter(u => {
                const createdAt = new Date(u.createdAt)
                const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                return createdAt > weekAgo
              }).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Búsqueda */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar por email o nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Tabla de usuarios */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuarios</CardTitle>
          <CardDescription>
            Gestiona las suscripciones de todos los usuarios registrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuario</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Cambios</TableHead>
                <TableHead>Fecha de Registro</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      {user.name || 'Sin nombre'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      {user.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(user.subscriptionStatus)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.birthDataChangeCount >= 3 ? "destructive" : "outline"}>
                      {user.birthDataChangeCount || 0}/3
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString('es-ES')}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedUser(user)
                        setIsDialogOpen(true)
                      }}
                    >
                      Gestionar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog para editar suscripción */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gestionar Suscripción</DialogTitle>
            <DialogDescription>
              Modifica el estado de suscripción del usuario {selectedUser?.email}
            </DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="status">Estado de Suscripción</Label>
                <Select
                  defaultValue={selectedUser.subscriptionStatus}
                  onValueChange={(value) => {
                    setSelectedUser({ ...selectedUser, subscriptionStatus: value })
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="free">Gratuito</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {selectedUser.subscriptionStatus === 'premium' && (
                <div>
                  <Label htmlFor="expiresAt">Fecha de Expiración (opcional)</Label>
                  <Input
                    id="expiresAt"
                    type="datetime-local"
                    defaultValue={selectedUser.subscriptionExpiresAt ?
                      new Date(selectedUser.subscriptionExpiresAt).toISOString().slice(0, 16) : ''}
                    onChange={(e) => {
                      setSelectedUser({
                        ...selectedUser,
                        subscriptionExpiresAt: e.target.value ? new Date(e.target.value).toISOString() : null
                      })
                    }}
                  />
                </div>
              )}

              <div className="pt-4 border-t">
                <Label className="block mb-2">Restricciones de Datos de Nacimiento</Label>
                <div className="flex items-center justify-between p-3 border rounded-md bg-slate-50">
                  <div>
                    <span className="font-semibold text-sm">Cambios realizados:</span>
                    <span className="ml-2 text-sm">{selectedUser.birthDataChangeCount || 0} de 3</span>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => resetBirthDataCounter(selectedUser.id)}
                    disabled={updating}
                  >
                    Resetear Contador
                  </Button>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <div className="flex gap-2 flex-1">
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  if (selectedUser) {
                    updateUserSubscription(
                      selectedUser.id,
                      selectedUser.subscriptionStatus,
                      selectedUser.subscriptionExpiresAt || undefined
                    )
                  }
                }}
                disabled={updating}
              >
                {updating ? 'Actualizando...' : 'Guardar Cambios'}
              </Button>
            </div>
            <Button
              variant="destructive"
              onClick={() => {
                setUserToDelete(selectedUser)
                setIsDeleteDialogOpen(true)
              }}
              disabled={updating}
              className="w-full sm:w-auto"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Eliminar Usuario
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* AlertDialog para confirmar eliminación */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar usuario definitivamente?</AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p className="font-semibold text-destructive">
                ⚠️ Esta acción NO se puede deshacer.
              </p>
              <p>Se eliminará permanentemente:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>El usuario: <strong>{userToDelete?.email}</strong></li>
                <li>Todas sus cartas natales</li>
                <li>Todas sus interpretaciones</li>
                <li>Todos sus eventos de rectificación</li>
                <li>Todas sus solicitudes horarias</li>
                <li>Todos sus datos asociados</li>
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (userToDelete) {
                  deleteUser(userToDelete.id)
                }
              }}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? 'Eliminando...' : 'Eliminar Permanentemente'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
