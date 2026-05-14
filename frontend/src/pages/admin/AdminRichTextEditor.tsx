import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading2,
  Image as ImageIcon,
  Italic,
  Link,
  List,
  ListOrdered,
  Minus,
  Pilcrow,
  Quote,
  Redo2,
  RemoveFormatting,
  Strikethrough,
  Underline,
  Undo2,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { api } from '../../api/client';

type CommandButton = {
  label: string;
  icon: typeof Bold;
  command: string;
  value?: string;
};

const commands: CommandButton[] = [
  { label: 'Обычный текст', icon: Pilcrow, command: 'formatBlock', value: 'p' },
  { label: 'Заголовок', icon: Heading2, command: 'formatBlock', value: 'h2' },
  { label: 'Жирный', icon: Bold, command: 'bold' },
  { label: 'Курсив', icon: Italic, command: 'italic' },
  { label: 'Подчеркнутый', icon: Underline, command: 'underline' },
  { label: 'Зачеркнутый', icon: Strikethrough, command: 'strikeThrough' },
  { label: 'Список', icon: List, command: 'insertUnorderedList' },
  { label: 'Нумерованный список', icon: ListOrdered, command: 'insertOrderedList' },
  { label: 'Цитата', icon: Quote, command: 'formatBlock', value: 'blockquote' },
  { label: 'Слева', icon: AlignLeft, command: 'justifyLeft' },
  { label: 'По центру', icon: AlignCenter, command: 'justifyCenter' },
  { label: 'Справа', icon: AlignRight, command: 'justifyRight' },
  { label: 'Линия', icon: Minus, command: 'insertHorizontalRule' },
  { label: 'Очистить формат', icon: RemoveFormatting, command: 'removeFormat' },
  { label: 'Отменить', icon: Undo2, command: 'undo' },
  { label: 'Повторить', icon: Redo2, command: 'redo' },
];

const fontSizes = [
  { label: '14', value: '14px' },
  { label: '16', value: '16px' },
  { label: '18', value: '18px' },
  { label: '20', value: '20px' },
  { label: '24', value: '24px' },
  { label: '32', value: '32px' },
];

function escapeAttribute(value: string) {
  return value.replace(/"/g, '&quot;');
}

export default function AdminRichTextEditor({
  value,
  onChange,
  required,
}: {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const selectionRef = useRef<Range | null>(null);
  const selectedImageRef = useRef<HTMLImageElement | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [hasSelectedImage, setHasSelectedImage] = useState(false);

  useEffect(() => {
    const editor = editorRef.current;

    if (editor && editor.innerHTML !== value && document.activeElement !== editor) {
      editor.innerHTML = value;
    }
  }, [value]);

  function emitChange() {
    onChange(editorRef.current?.innerHTML ?? '');
  }

  function selectImage(image: HTMLImageElement | null) {
    editorRef.current?.querySelectorAll('img[data-selected="true"]').forEach((item) => {
      item.removeAttribute('data-selected');
      item.classList.remove('ring-2', 'ring-accent', 'ring-offset-2');
    });

    if (image) {
      image.dataset.selected = 'true';
      image.classList.add('ring-2', 'ring-accent', 'ring-offset-2');
    }

    selectedImageRef.current = image;
    setHasSelectedImage(Boolean(image));
  }

  function saveSelection() {
    const selection = window.getSelection();

    if (selection?.rangeCount) {
      selectionRef.current = selection.getRangeAt(0);
    }
  }

  function restoreSelection() {
    const selection = window.getSelection();

    if (!selection || !selectionRef.current) {
      return;
    }

    selection.removeAllRanges();
    selection.addRange(selectionRef.current);
  }

  function run(command: string, commandValue?: string) {
    restoreSelection();

    if (command === 'createLink') {
      const href = window.prompt('Ссылка');

      if (!href) {
        return;
      }

      document.execCommand(command, false, href);
    } else {
      document.execCommand(command, false, commandValue);
    }

    emitChange();
    editorRef.current?.focus();
    saveSelection();
  }

  function applyFontSize(fontSize: string) {
    restoreSelection();
    document.execCommand('fontSize', false, '7');

    editorRef.current?.querySelectorAll('font[size="7"]').forEach((font) => {
      const span = document.createElement('span');
      span.style.fontSize = fontSize;
      span.innerHTML = font.innerHTML;
      font.replaceWith(span);
    });

    emitChange();
    editorRef.current?.focus();
    saveSelection();
  }

  async function uploadImage(file: File) {
    setIsUploadingImage(true);

    try {
      const payload = new FormData();
      payload.append('image', file);
      const { data } = await api.post<{ url: string }>('/admin/rich-text-images', payload);
      restoreSelection();
      document.execCommand(
        'insertHTML',
        false,
        `<figure style="width:100%;margin-left:auto;margin-right:auto;"><img src="${escapeAttribute(data.url)}" alt="" style="width:100%;" /><figcaption>Описание изображения</figcaption></figure><p><br></p>`,
      );
      emitChange();
      editorRef.current?.focus();
      saveSelection();
    } finally {
      setIsUploadingImage(false);
      if (imageInputRef.current) {
        imageInputRef.current.value = '';
      }
    }
  }

  function applyImageWidth(width: string) {
    const image = selectedImageRef.current;

    if (!image) {
      return;
    }

    const figure = image.closest('figure') as HTMLElement | null;
    const target = figure ?? image;

    target.style.width = width;
    target.style.marginLeft = width === '100%' ? '' : 'auto';
    target.style.marginRight = width === '100%' ? '' : 'auto';
    image.style.width = '100%';
    image.style.height = 'auto';
    emitChange();
  }

  return (
    <div className="mt-2 overflow-hidden rounded-lg border border-slate-200 bg-white">
      <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-slate-50 p-2">
        <select
          className="h-9 rounded-md border border-slate-200 bg-white px-2 text-xs font-semibold text-slate-600"
          defaultValue=""
          title="Размер текста"
          onMouseDown={saveSelection}
          onChange={(event) => {
            if (event.target.value) {
              applyFontSize(event.target.value);
              event.target.value = '';
            }
          }}
        >
          <option value="">Размер</option>
          {fontSizes.map((size) => (
            <option key={size.value} value={size.value}>
              {size.label}px
            </option>
          ))}
        </select>

        <label className="flex h-9 items-center gap-2 rounded-md border border-slate-200 bg-white px-2 text-xs font-semibold text-slate-600" title="Цвет текста">
          Цвет
          <input
            type="color"
            className="h-6 w-6 cursor-pointer border-0 bg-transparent p-0"
            onMouseDown={saveSelection}
            onChange={(event) => run('foreColor', event.target.value)}
          />
        </label>

        {commands.map(({ label, icon: Icon, command, value: commandValue }) => (
          <button
            key={`${command}-${commandValue ?? ''}`}
            type="button"
            title={label}
            onMouseDown={(event) => {
              event.preventDefault();
              run(command, commandValue);
            }}
            className="grid h-9 w-9 place-items-center rounded-md text-slate-600 hover:bg-white hover:text-navy"
          >
            <Icon size={17} />
          </button>
        ))}

        <button
          type="button"
          title="Ссылка"
          onMouseDown={(event) => {
            event.preventDefault();
            run('createLink');
          }}
          className="grid h-9 w-9 place-items-center rounded-md text-slate-600 hover:bg-white hover:text-navy"
        >
          <Link size={17} />
        </button>

        <button
          type="button"
          title="Добавить изображение"
          disabled={isUploadingImage}
          onMouseDown={(event) => {
            event.preventDefault();
            saveSelection();
            imageInputRef.current?.click();
          }}
          className="grid h-9 w-9 place-items-center rounded-md text-slate-600 hover:bg-white hover:text-navy disabled:opacity-50"
        >
          <ImageIcon size={17} />
        </button>
        <div className={`flex h-9 items-center gap-1 rounded-md border border-slate-200 bg-white px-2 text-xs font-semibold ${hasSelectedImage ? 'text-slate-600' : 'text-slate-300'}`}>
          <span>Фото</span>
          {['25%', '50%', '75%', '100%'].map((width) => (
            <button
              key={width}
              type="button"
              disabled={!hasSelectedImage}
              onMouseDown={(event) => {
                event.preventDefault();
                applyImageWidth(width);
              }}
              className="rounded px-1.5 py-1 hover:bg-slate-100 disabled:hover:bg-transparent"
            >
              {width}
            </button>
          ))}
        </div>
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];

            if (file) {
              uploadImage(file).catch(() => window.alert('Не удалось загрузить изображение'));
            }
          }}
        />
      </div>
      <div
        ref={editorRef}
        className="min-h-[320px] px-4 py-3 text-sm font-normal leading-7 text-slate-700 outline-none [&_a]:font-semibold [&_a]:text-accent [&_blockquote]:border-l-4 [&_blockquote]:border-accent [&_blockquote]:pl-4 [&_figcaption]:mt-2 [&_figcaption]:text-center [&_figcaption]:text-xs [&_figcaption]:font-semibold [&_figcaption]:text-slate-400 [&_figure]:my-5 [&_h2]:text-2xl [&_h2]:font-semibold [&_hr]:my-5 [&_hr]:border-slate-200 [&_img]:max-h-[460px] [&_img]:rounded-lg [&_img]:object-cover [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6"
        contentEditable
        data-required={required ? 'true' : undefined}
        onBlur={saveSelection}
        onInput={emitChange}
        onKeyUp={saveSelection}
        onMouseUp={(event) => {
          const target = event.target;
          selectImage(target instanceof HTMLImageElement ? target : null);
          saveSelection();
        }}
        suppressContentEditableWarning
      />
    </div>
  );
}
