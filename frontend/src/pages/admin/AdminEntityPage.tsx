import AdminCrudPanel from './AdminCrudPanel';
import AdminSettingsPanel from './AdminSettingsPanel';
import type { EntityConfig } from './entityConfigs';

export default function AdminEntityPage({ config }: { config: EntityConfig }) {
  return (
    <div className="p-6 lg:p-10">
      {config.mode === 'settings' || config.endpoint === 'settings' ? <AdminSettingsPanel config={{ ...config, mode: 'settings' }} /> : <AdminCrudPanel config={config} />}
    </div>
  );
}
