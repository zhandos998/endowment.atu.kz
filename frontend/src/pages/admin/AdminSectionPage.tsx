import { useMemo, useState } from 'react';
import AdminCrudPanel from './AdminCrudPanel';
import AdminSettingsPanel from './AdminSettingsPanel';
import type { AdminSection } from './adminSections';
import type { EntityConfig } from './entityConfigs';

function renderAdminConfig(config: EntityConfig) {
  if (config.mode === 'settings') {
    return <AdminSettingsPanel config={config} />;
  }

  return (
    <>
      {config.settingsBefore && <AdminSettingsPanel config={config.settingsBefore} />}
      <div className={config.settingsBefore ? 'mt-8' : ''}>
        <AdminCrudPanel config={config} />
      </div>
    </>
  );
}

export default function AdminSectionPage({ section }: { section: AdminSection }) {
  const [activeKey, setActiveKey] = useState(section.items[0]?.key ?? '');
  const activeItem = useMemo(() => section.items.find((item) => item.key === activeKey) ?? section.items[0], [activeKey, section.items]);

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">Раздел сайта</p>
        <h1 className="mt-3 text-4xl font-semibold text-navy">{section.title}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500">{section.description}</p>
      </div>

      <div className="mb-8 overflow-x-auto rounded-xl bg-white p-2 shadow-soft">
        <div className="flex min-w-max gap-2">
          {section.items.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveKey(item.key)}
              className={`rounded-lg px-4 py-3 text-sm font-bold transition ${
                activeItem?.key === item.key ? 'bg-accent text-white shadow-[0_10px_22px_rgba(255,124,59,0.2)]' : 'text-slate-600 hover:bg-slate-100 hover:text-navy'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {activeItem && <div key={`${section.path}-${activeItem.key}`}>{renderAdminConfig(activeItem.config)}</div>}
    </div>
  );
}
