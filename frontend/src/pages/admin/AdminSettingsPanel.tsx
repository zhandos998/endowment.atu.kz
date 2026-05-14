import { useCallback, useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { api } from '../../api/client';
import type { EntityConfig } from './entityConfigs';

type Row = Record<string, boolean | string | number | null | undefined>;
type FormValue = boolean | string | File;

function normalizeCheckboxValue(value: Row[string]) {
  return value === true || value === 1 || value === '1';
}

export default function AdminSettingsPanel({ config }: { config: EntityConfig }) {
  const [rowId, setRowId] = useState<string | number | null>(null);
  const [currentRow, setCurrentRow] = useState<Row | null>(null);
  const [formValues, setFormValues] = useState<Record<string, FormValue>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  const load = useCallback(async () => {
    setIsLoading(true);
    const { data } = await api.get(`/admin/${config.endpoint}`, {
      params: { per_page: 1 },
    });
    const row: Row | undefined = data.data?.[0];
    const values: Record<string, FormValue> = {};

    config.fields.forEach((field) => {
      if (field.type === 'file') {
        return;
      }

      if (field.type === 'checkbox') {
        values[field.name] = row ? normalizeCheckboxValue(row[field.name]) : Boolean(field.defaultChecked);
        return;
      }

      const raw = row?.[field.name];
      values[field.name] = raw == null ? '' : String(raw).slice(0, field.type === 'datetime-local' ? 16 : undefined);
    });

    setRowId(typeof row?.id === 'string' || typeof row?.id === 'number' ? row.id : null);
    setCurrentRow(row ?? null);
    setFormValues(values);
    setIsLoading(false);
  }, [config.endpoint, config.fields]);

  useEffect(() => {
    load().catch(() => {
      setRowId(null);
      setCurrentRow(null);
      setFormValues({});
      setIsLoading(false);
    });
  }, [load]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setMessage('');

    try {
      const payload = new FormData();
      config.fields.forEach((field) => {
        const value = formValues[field.name];

        if (field.type === 'checkbox') {
          payload.append(field.name, value ? '1' : '0');
          return;
        }

        if (value instanceof File) {
          payload.append(field.name, value);
        } else if (value !== undefined) {
          payload.append(field.name, String(value));
        }
      });

      if (rowId) {
        payload.append('_method', 'PUT');
        await api.post(`/admin/${config.endpoint}/${rowId}`, payload);
      } else {
        await api.post(`/admin/${config.endpoint}`, payload);
      }

      await load();
      setMessage('Сохранено');
    } catch {
      setMessage('Не удалось сохранить');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-navy">{config.title}</h1>
        {config.description && <p className="mt-2 text-sm leading-6 text-slate-500">{config.description}</p>}
      </div>

      <form onSubmit={submit} className="rounded-xl bg-white p-6 shadow-soft">
        {isLoading ? (
          <div className="py-8 text-sm text-slate-500">Загрузка...</div>
        ) : (
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
                  <>
                    <input
                      className="admin-input mt-2"
                      type="file"
                      accept={field.accept ?? 'image/*'}
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (file) {
                          setFormValues((value) => ({ ...value, [field.name]: file }));
                        }
                      }}
                    />
                    {typeof currentRow?.[`${field.name}_url`] === 'string' && (
                      <a href={String(currentRow[`${field.name}_url`])} target="_blank" rel="noreferrer" className="mt-2 inline-flex text-xs font-bold text-accent hover:text-navy">
                        Открыть текущий файл
                      </a>
                    )}
                  </>
                ) : field.type === 'select' ? (
                  <select
                    required={field.required}
                    className="admin-input mt-2"
                    value={String(formValues[field.name] ?? '')}
                    onChange={(event) => setFormValues((value) => ({ ...value, [field.name]: event.target.value }))}
                  >
                    <option value="">Выберите значение</option>
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : field.type === 'checkbox' ? (
                  <span className="mt-2 flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-3">
                    <input
                      type="checkbox"
                      checked={Boolean(formValues[field.name])}
                      onChange={(event) => setFormValues((value) => ({ ...value, [field.name]: event.target.checked }))}
                      className="h-4 w-4 accent-accent"
                    />
                    <span className="text-sm font-medium text-slate-600">Активно</span>
                  </span>
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
        )}

        <div className="mt-7 flex items-center gap-4">
          <button disabled={isLoading || isSaving} className="rounded-full bg-accent px-7 py-4 text-sm font-bold text-white hover:bg-[#ef6f2d] disabled:opacity-60">
            {isSaving ? 'Сохранение...' : 'Сохранить'}
          </button>
          {message && <span className="text-sm font-semibold text-emerald-600">{message}</span>}
        </div>
      </form>
    </div>
  );
}
