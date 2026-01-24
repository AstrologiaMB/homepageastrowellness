'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import {
  Search,
  User as UserIcon,
  Star,
  Calendar,
  Mail,
  Shield,
  Trash2,
  Download,
  Filter,
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  email: string;
  name: string | null;
  subscriptionStatus: string;
  subscriptionExpiresAt: string | null;
  createdAt: string;
  updatedAt: string;
  emailVerified?: string | null;
  birthDataChangeCount: number;
  hasDraconicAccess: boolean;
  subscription?: {
    hasBaseBundle: boolean;
    hasLunarCalendar: boolean;
    hasAstrogematria: boolean;
    hasElectiveChart: boolean;
  };
}

export default function AdminUsersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);

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
      'Has Draconic (Lifetime)',
    ];

    const rows = users.map((user) => [
      user.id,
      user.name || '',
      user.email,
      new Date(user.createdAt).toISOString().split('T')[0],
      user.subscriptionStatus,
      user.subscription?.hasBaseBundle ? 'YES' : 'NO',
      user.subscription?.hasLunarCalendar ? 'YES' : 'NO',
      user.subscription?.hasAstrogematria ? 'YES' : 'NO',
      user.subscription?.hasElectiveChart ? 'YES' : 'NO',
      user.hasDraconicAccess ? 'YES' : 'NO',
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((field) => `"${field}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `astro_users_export_${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  // Delete state
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Maintenance actions state
  const [clearingCache, setClearingCache] = useState(false);
  const [clearingCalendarCache, setClearingCalendarCache] = useState(false);
  const [resettingPassword, setResettingPassword] = useState(false);
  const [tempPassword, setTempPassword] = useState<string | null>(null);
  const [verifyingEmail, setVerifyingEmail] = useState(false);

  // Verificar si el usuario es admin
  useEffect(() => {
    if (status === 'loading') return;

    if (!session || session.user?.email !== 'info@astrochat.online') {
      router.push('/');
      return;
    }

    fetchUsers();
  }, [session, status, router]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserSubscription = async (
    userId: string,
    subscriptionStatus: string,
    expiresAt?: string
  ) => {
    setUpdating(true);
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
      });

      if (response.ok) {
        await fetchUsers(); // Recargar la lista
        setIsDialogOpen(false);
        setSelectedUser(null);
      }
    } catch (error) {
      console.error('Error updating subscription:', error);
    } finally {
      setUpdating(false);
    }
  };

  const resetBirthDataCounter = async (userId: string) => {
    if (
      !confirm('¿Estás seguro de que quieres reiniciar el contador de cambios para este usuario?')
    )
      return;

    setUpdating(true);
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resetCounter: true,
        }),
      });

      if (response.ok) {
        await fetchUsers(); // Recargar la lista
        setIsDialogOpen(false);
        setSelectedUser(null);
        toast({
          title: 'Contador reiniciado',
          description: 'El contador de cambios de nacimiento ha sido reiniciado a 0.',
          variant: 'default',
        });
      } else {
        const data = await response.json();
        toast({
          title: 'Error',
          description: data.error || 'Error al reiniciar contador.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error resetting counter:', error);
      toast({
        title: 'Error',
        description: 'Error de conexión al reiniciar contador.',
        variant: 'destructive',
      });
    } finally {
      setUpdating(false);
    }
  };

  const deleteUser = async (userId: string) => {
    setDeleting(true);
    try {
      const response = await fetch(`/api/admin/users`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        await fetchUsers(); // Recargar la lista
        setIsDeleteDialogOpen(false);
        setUserToDelete(null);
        setIsDialogOpen(false);
        setSelectedUser(null);
        toast({
          title: 'Usuario eliminado',
          description: 'El usuario y todos sus datos han sido eliminados permanentemente.',
          variant: 'default',
        });
      } else {
        const data = await response.json();
        toast({
          title: 'Error',
          description: data.error || 'Error al eliminar usuario',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: 'Error',
        description: 'Error de conexión al eliminar usuario',
        variant: 'destructive',
      });
    } finally {
      setDeleting(false);
    }
  };

  const clearUserCache = async (userId: string) => {
    if (
      !confirm(
        '⚠️ ATENCIÓN: Esto eliminará TODAS las interpretaciones guardadas para este usuario. Se volverán a generar (consumiendo créditos/costo) la próxima vez que el usuario entre. ¿Estás seguro?'
      )
    )
      return;

    setClearingCache(true);
    try {
      const response = await fetch(`/api/admin/users/${userId}/cache`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const data = await response.json();
        toast({
          title: 'Caché de interpretaciones limpiada',
          description: `${data.message} (${data.deletedCount || 0} registros)`,
          variant: 'default',
        });
        setIsDialogOpen(false);
        setSelectedUser(null);
      } else {
        const data = await response.json();
        toast({
          title: 'Error',
          description: data.error || 'Error al limpiar caché',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error clearing cache:', error);
      toast({
        title: 'Error',
        description: 'Error de conexión al intentar limpiar la caché.',
        variant: 'destructive',
      });
    } finally {
      setClearingCache(false);
    }
  };

  const clearUserCalendarCache = async (userId: string) => {
    if (
      !confirm(
        '⚠️ ATENCIÓN: Esto eliminará el calendario personal calculado. Se volverá a calcular la próxima vez que el usuario entre. ¿Estás seguro?'
      )
    )
      return;

    setClearingCalendarCache(true);
    try {
      const response = await fetch(`/api/admin/users/${userId}/calendar-cache`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const data = await response.json();
        toast({
          title: 'Caché de calendario eliminada',
          description: `${data.message} (${data.deletedCount || 0} registros)`,
          variant: 'default',
        });
        setIsDialogOpen(false);
        setSelectedUser(null);
      } else {
        const data = await response.json();
        toast({
          title: 'Error',
          description: data.error || 'Error al limpiar caché de calendario',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error clearing calendar cache:', error);
      toast({
        title: 'Error',
        description: 'Error de conexión al intentar limpiar la caché de calendario.',
        variant: 'destructive',
      });
    } finally {
      setClearingCalendarCache(false);
    }
  };

  const resetUserPassword = async (userId: string) => {
    if (
      !confirm(
        '⚠️ ¿Estás seguro? Esto invalidará la contraseña actual del usuario y generará una nueva inmediatamente.'
      )
    )
      return;

    setResettingPassword(true);
    setTempPassword(null); // Limpiar anterior si hubo
    try {
      const response = await fetch(`/api/admin/users/${userId}/reset-password`, {
        method: 'PUT',
      });

      if (response.ok) {
        const data = await response.json();
        setTempPassword(data.tempPassword);
        toast({
          title: 'Contraseña generada',
          description: 'Copia la nueva contraseña temporal.',
          variant: 'default',
        });
        // No cerramos el dialog para que pueda ver la password
      } else {
        const data = await response.json();
        toast({
          title: 'Error',
          description: data.error || 'Error al restablecer contraseña',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      toast({
        title: 'Error',
        description: 'Error de conexión.',
        variant: 'destructive',
      });
    } finally {
      setResettingPassword(false);
    }
  };

  const verifyUserEmail = async (userId: string) => {
    if (!confirm('¿Confirmas que quieres marcar este email como verificado manualmente?')) return;

    setVerifyingEmail(true);
    try {
      const response = await fetch(`/api/admin/users/${userId}/verify-email`, {
        method: 'PUT',
      });

      if (response.ok) {
        await fetchUsers(); // Recargar para ver el cambio en la lista si lo hubiera
        toast({
          title: 'Email verificado',
          description: 'El usuario ha sido marcado como verificado.',
          variant: 'default',
        });
        // Actualizamos el usuario seleccionado localmente para que se refleje en el dialog
        if (selectedUser) {
          // Create a new object to avoid type errors
          const updatedUser: User = {
            ...selectedUser,
            emailVerified: new Date().toISOString(),
          };
          setSelectedUser(updatedUser);
        }
      } else {
        const data = await response.json();
        toast({
          title: 'Error',
          description: data.error || 'Error al verificar email',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error verifying email:', error);
      toast({
        title: 'Error',
        description: 'Error de conexión.',
        variant: 'destructive',
      });
    } finally {
      setVerifyingEmail(false);
    }
  };

  const filteredUsers = users.filter((user) => {
    // 1. Filter by term
    const matchesTerm =
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase()));

    // 2. Filter by status
    let matchesStatus = true;
    if (statusFilter !== 'all') {
      matchesStatus = user.subscriptionStatus === statusFilter;
    }

    return matchesTerm && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'premium':
        return <Badge className="bg-yellow-500 text-yellow-900">Premium ⭐</Badge>;
      case 'free':
        return <Badge variant="secondary">Gratuito</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      </div>
    );
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
    );
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
            <UserIcon className="h-4 w-4 text-muted-foreground" />
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
              {users.filter((u) => u.subscriptionStatus === 'premium').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Gratuitos</CardTitle>
            <UserIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter((u) => u.subscriptionStatus === 'free').length}
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
              {
                users.filter((u) => {
                  const createdAt = new Date(u.createdAt);
                  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                  return createdAt > weekAgo;
                }).length
              }
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Búsqueda y Filtros */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar por email o nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="w-full md:w-[200px]">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Estado" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
              <SelectItem value="free">Gratuito</SelectItem>
            </SelectContent>
          </Select>
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
                      <UserIcon className="h-4 w-4 text-muted-foreground" />
                      {user.name || 'Sin nombre'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      {user.email}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(user.subscriptionStatus)}</TableCell>
                  <TableCell>
                    <Badge variant={user.birthDataChangeCount >= 3 ? 'destructive' : 'outline'}>
                      {user.birthDataChangeCount || 0}/3
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(user.createdAt).toLocaleDateString('es-ES')}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedUser(user);
                        setIsDialogOpen(true);
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
        <DialogContent className="max-h-[85vh] overflow-y-auto">
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
                    setSelectedUser({ ...selectedUser, subscriptionStatus: value });
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
                    defaultValue={
                      selectedUser.subscriptionExpiresAt
                        ? new Date(selectedUser.subscriptionExpiresAt).toISOString().slice(0, 16)
                        : ''
                    }
                    onChange={(e) => {
                      setSelectedUser({
                        ...selectedUser,
                        subscriptionExpiresAt: e.target.value
                          ? new Date(e.target.value).toISOString()
                          : null,
                      });
                    }}
                  />
                </div>
              )}

              <div className="pt-4 border-t">
                <Label className="block mb-2">Restricciones de Datos de Nacimiento</Label>
                <div className="flex items-center justify-between p-3 border rounded-md bg-slate-50">
                  <div>
                    <span className="font-semibold text-sm">Cambios realizados:</span>
                    <span className="ml-2 text-sm">
                      {selectedUser.birthDataChangeCount || 0} de 3
                    </span>
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

              {/* Account Verification Section */}
              <div className="pt-4 border-t">
                <Label className="block mb-2">Estado de la Cuenta</Label>
                <div className="flex items-center justify-between p-3 border rounded-md bg-slate-50">
                  <div>
                    <span className="font-semibold text-sm block">Email Verificado:</span>
                    {selectedUser.email && !selectedUser.emailVerified ? (
                      <span className="text-red-500 text-xs font-bold">❌ Pendiente</span>
                    ) : (
                      <span className="text-green-600 text-xs font-bold">✅ Verificado</span>
                    )}
                  </div>
                  {selectedUser.email && !selectedUser.emailVerified && (
                    <Button
                      variant="default"
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => verifyUserEmail(selectedUser.id)}
                      disabled={verifyingEmail || updating}
                    >
                      {verifyingEmail ? 'Verificando...' : '✅ Marcar como Verificado'}
                    </Button>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t">
                <Label className="block mb-2 text-amber-600 font-semibold">
                  Zona de Mantenimiento
                </Label>
                <div className="flex flex-col gap-3">
                  {/* Reset Password */}
                  <div className="flex items-center justify-between p-3 border border-amber-200 rounded-md bg-amber-50">
                    <div className="space-y-1">
                      <span className="font-medium text-sm text-amber-900 block">
                        Restablecer Contraseña
                      </span>
                      <span className="text-xs text-amber-700 block max-w-[200px]">
                        Genera una contraseña temporal segura para que el usuario pueda ingresar.
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-amber-500 text-amber-700 hover:bg-amber-100"
                      onClick={() => resetUserPassword(selectedUser.id)}
                      disabled={resettingPassword || updating}
                    >
                      {resettingPassword ? 'Generando...' : '🔑 Reset Password'}
                    </Button>
                  </div>

                  {/* Clear Cache */}
                  <div className="flex items-center justify-between p-3 border border-amber-200 rounded-md bg-amber-50">
                    <div className="space-y-1">
                      <span className="font-medium text-sm text-amber-900 block">
                        Limpiar Caché de Interpretaciones
                      </span>
                      <span className="text-xs text-amber-700 block max-w-[200px]">
                        Elimina textos generados corruptos. Obliga a regenerar con IA nueva.
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-amber-500 text-amber-700 hover:bg-amber-100"
                      onClick={() => clearUserCache(selectedUser.id)}
                      disabled={clearingCache || updating}
                    >
                      {clearingCache ? 'Limpiando...' : '🧹 Limpiar Caché'}
                    </Button>
                  </div>

                  {/* Clear Calendar Cache (NEW) */}
                  <div className="flex items-center justify-between p-3 border border-amber-200 rounded-md bg-amber-50">
                    <div className="space-y-1">
                      <span className="font-medium text-sm text-amber-900 block">
                        Limpiar Caché de Calendario
                      </span>
                      <span className="text-xs text-amber-700 block max-w-[200px]">
                        Elimina el calendario personal generado. Obliga a recalcular.
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-amber-500 text-amber-700 hover:bg-amber-100"
                      onClick={() => clearUserCalendarCache(selectedUser.id)}
                      disabled={clearingCalendarCache || updating}
                    >
                      {clearingCalendarCache ? 'Limpiando...' : '🗓️ Limpiar Calendario'}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Resultado del Reset Password */}
              {tempPassword && (
                <div className="p-4 mt-4 bg-green-100 border-2 border-green-500 rounded-lg animate-in fade-in slide-in-from-top-2">
                  <h4 className="text-green-800 font-bold mb-2 flex items-center gap-2">
                    ✅ Contraseña Restablecida Exitosamente
                  </h4>
                  <p className="text-green-700 text-sm mb-3">
                    Copia esta contraseña y envíala al usuario{' '}
                    <strong>({selectedUser.email})</strong>. Solo se muestra una vez.
                  </p>
                  <div className="flex gap-2">
                    <code className="flex-1 p-3 bg-white border border-green-300 rounded font-mono text-lg font-bold text-center tracking-wider select-all">
                      {tempPassword}
                    </code>
                    <Button
                      variant="default"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => {
                        navigator.clipboard.writeText(tempPassword);
                        toast({
                          title: 'Copiado',
                          description: 'Contraseña copiada al portapapeles',
                        });
                      }}
                    >
                      Copiar
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <div className="flex gap-2 flex-1">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  if (selectedUser) {
                    updateUserSubscription(
                      selectedUser.id,
                      selectedUser.subscriptionStatus,
                      selectedUser.subscriptionExpiresAt || undefined
                    );
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
                setUserToDelete(selectedUser);
                setIsDeleteDialogOpen(true);
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
              <p className="font-semibold text-destructive">⚠️ Esta acción NO se puede deshacer.</p>
              <p>Se eliminará permanentemente:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  El usuario: <strong>{userToDelete?.email}</strong>
                </li>
                <li>Todas sus cartas natales</li>
                <li>Todas sus interpretaciones</li>
                <li>Todos sus eventos de rectificación</li>
                <li>Todas sus solicitudes horarias</li>
                <li>Todos sus datos asociados</li>
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (userToDelete) {
                  deleteUser(userToDelete.id);
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
  );
}
