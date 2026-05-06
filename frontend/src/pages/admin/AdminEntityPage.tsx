import { useCallback, useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { Edit3, Plus, Search, Trash2, X } from 'lucide-react';
import { api } from '../../api/client';
import type { EntityConfig } from './entityConfigs';

type Row = Record<string, string | number | null | undefined>;

type Meta = {
  current_page: number;
  last_page: number;
  total: number;
};

export default function AdminEntityPage({ config }: { config: EntityConfig }) {
  const [rows, setRows] = useState<Row[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState<Row | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formValues, setFormValues] = useState<Record<string, string | File>>({});

  const title = useMemo(() => config.title, [config.title]);

  const load = useCallback(async () => {
    const { data } = await api.get(`/admin/${config.endpoint}`, {
      params: { search, page, per_page: 8 },
    });
    setRows(data.data);
    setMeta(data.meta);
  }, [config.endpoint, page, search]);

  useEffect(() => {
    load().catch(() => {
      setRows([]);
      setMeta(null);
    });
  }, [load]);

  function openCreate() {
    setEditing(null);
    setFormValues({});
    setIsFormOpen(true);
  }

  function openEdit(row: Row) {
    setEditing(row);
    const values: Record<string, string> = {};
    config.fields.forEach((field) => {
      if (field.type !== 'file') {
        const raw = row[field.name];
        values[field.name] = raw == null ? '' : String(raw).slice(0, field.type === 'datetime-local' ? 16 : undefined);
      }
    });
    setFormValues(values);
    setIsFormOpen(true);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const payload = new FormData();
    config.fields.forEach((field) => {
      const value = formValues[field.name];
      if (value instanceof File) {
        payload.append(field.name, value);
      } else if (value !== undefined && value !== '') {
        payload.append(field.name, value);
      }
    });

    if (editing?.id) {
      payload.append('_method', 'PUT');
      await api.post(`/admin/${config.endpoint}/${editing.id}`, payload);
    } else {
      await api.post(`/admin/${config.endpoint}`, payload);
    }

    setIsFormOpen(false);
    await load();
  }

  async function remove(row: Row) {
    if (!row.id) {
      return;
    }

    await api.delete(`/admin/${config.endpoint}/${row.id}`);
    await load();
  }

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-navy">{title}</h1>
          <p className="mt-2 text-sm text-slate-500">CRUD, фильтр, пагинация и загрузка изображений.</p>
        </div>
        <button onClick={openCreate} className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-bold text-white hover:bg-[#ef6f2d]">
          <Plus size={18} /> Добавить
        </button>
      </div>

      <div className="mb-5 flex gap-3 rounded-xl bg-white p-4 shadow-soft">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input className="admin-input pl-10" placeholder="Поиск" value={search} onChange={(event) => setSearch(event.target.value)} />
        </div>
        <button onClick={() => { setPage(1); load(); }} className="rounded-lg bg-navy px-5 text-sm font-bold text-white">
          Найти
        </button>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-[0.14em] text-slate-500">
              <tr>
                {config.tableFields.map((field) => (
                  <th key={field} className="px-5 py-4">{field}</th>
                ))}
                <th className="px-5 py-4 text-right">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((row) => (
                <tr key={String(row.id)} className="hover:bg-slate-50/70">
                  {config.tableFields.map((field) => (
                    <td key={field} className="max-w-[320px] truncate px-5 py-4 text-slate-700">{String(row[field] ?? '—')}</td>
                  ))}
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openEdit(row)} className="grid h-9 w-9 place-items-center rounded-lg bg-slate-100 text-navy hover:bg-accent hover:text-white" aria-label="Редактировать">
                        <Edit3 size={16} />
                      </button>
                      <button onClick={() => remove(row)} className="grid h-9 w-9 place-items-center rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white" aria-label="Удалить">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!rows.length && (
                <tr>
                  <td className="px-5 py-8 text-center text-slate-500" colSpan={config.tableFields.length + 1}>
                    Данные не найдены.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {meta && (
          <div className="flex items-center justify-between border-t border-slate-100 px-5 py-4 text-sm text-slate-500">
            <span>Всего: {meta.total}</span>
            <div className="flex items-center gap-2">
              <button disabled={page <= 1} onClick={() => setPage((value) => Math.max(1, value - 1))} className="rounded-lg border border-slate-200 px-3 py-2 disabled:opacity-40">Назад</button>
              <span>{meta.current_page} / {meta.last_page}</span>
              <button disabled={page >= meta.last_page} onClick={() => setPage((value) => value + 1)} className="rounded-lg border border-slate-200 px-3 py-2 disabled:opacity-40">Вперёд</button>
            </div>
          </div>
        )}
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-navy/55 p-4 backdrop-blur-sm">
          <form onSubmit={submit} className="max-h-[90vh] w-full max-w-2xl overflow-auto rounded-xl bg-white p-6 shadow-premium">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-navy">{editing ? 'Редактировать' : 'Добавить'}: {title}</h2>
              <button type="button" onClick={() => setIsFormOpen(false)} className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-600">
                <X size={18} />
              </button>
            </div>
            <div className="grid gap-5">
              {config.fields.map((field) => (
                <label key={field.name} className="block text-sm font-semibold text-slate-700">
                  {field.label}
                  {field.type === 'textarea' ? (
                    <textarea
                      required={field.required}
                      className="admin-input mt-2 min-h-28"
                      value={String(formValues[field.name] ?? '')}
                      onChange={(event) => setFormValues((value) => ({ ...value, [field.name]: event.target.value }))}
                    />
                  ) : field.type === 'file' ? (
                    <input
                      className="admin-input mt-2"
                      type="file"
                      accept="image/*"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (file) {
                          setFormValues((value) => ({ ...value, [field.name]: file }));
                        }
                      }}
                    />
                  ) : (
                    <input
                      required={field.required}
                      className="admin-input mt-2"
                      type={field.type}
                      value={String(formValues[field.name] ?? '')}
                      onChange={(event) => setFormValues((value) => ({ ...value, [field.name]: event.target.value }))}
                    />
                  )}
                </label>
              ))}
            </div>
            <button className="mt-7 w-full rounded-full bg-accent px-7 py-4 text-sm font-bold text-white hover:bg-[#ef6f2d]">
              Сохранить
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
