import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { logout } from '../login/actions';
import { ADMIN_SECTION_GROUPS } from '@/lib/admin-sections';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect('/admin/login');

  return (
    <AdminSidebar groups={ADMIN_SECTION_GROUPS} username={session.username} logoutAction={logout}>
      {children}
    </AdminSidebar>
  );
}
