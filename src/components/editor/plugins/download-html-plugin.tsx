import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $generateHtmlFromNodes } from '@lexical/html'
import { FileDown } from 'lucide-react'
import { Button } from '~/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~/components/ui/tooltip'
import { useSearchParams } from 'react-router'
import { useGetNoteDetail } from '~/features/note/note.query'

export function DownloadHtmlPlugin() {
  const [editor] = useLexicalComposerContext()
  const [searchParams] = useSearchParams()
  const noteId = searchParams.get('noteId')
  const { data: noteDetail } = useGetNoteDetail(noteId as string)

  const title = noteDetail?.title || 'Untitled Note'

  const handleDownload = () => {
    editor.read(() => {
      const htmlString = $generateHtmlFromNodes(editor, null)

      const fullHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${title}</title>
          <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
          <style>
            /* --- CẤU HÌNH CHUNG --- */
            body {
              background-color: #f3f4f6; /* Nền xám nhẹ */
              color: #1f2937;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              padding: 40px 20px;
              line-height: 1.6;
            }

            /* --- KHUNG TRANG GIẤY --- */
            .document-container {
              max-width: 1200px;
              margin: 0 auto;
              background-color: white;
              padding: 60px;
              border-radius: 8px;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            }

            /* --- TYPOGRAPHY CƠ BẢN (Khi export ra HTML thuần, Lexical dùng thẻ chuẩn) --- */
            h1 { font-size: 2.25em; font-weight: 700; margin-bottom: 0.8em; line-height: 1.2; padding-bottom: 0.3em; border-bottom: 1px solid #e5e7eb; }
            h2 { font-size: 1.75em; font-weight: 600; margin-top: 1.5em; margin-bottom: 0.5em; }
            h3 { font-size: 1.5em; font-weight: 600; margin-top: 1.25em; margin-bottom: 0.5em; }
            p { margin-bottom: 1.25em; }
            a { color: #2563eb; text-decoration: underline; text-underline-offset: 4px; }

            /* --- LISTS --- */
            ul, ol { margin-bottom: 1.25em; padding-left: 1.5em; }
            li { margin-bottom: 0.25em; }

            /* --- BLOCKQUOTE --- */
            blockquote {
              font-style: italic;
              border-left: 4px solid #3b82f6;
              background-color: #eff6ff;
              padding: 1rem;
              margin: 1.5rem 0;
              border-radius: 0 4px 4px 0;
              color: #374151;
            }

            /* --- IMAGES --- */
            img {
              max-width: 100%;
              height: auto;
              border-radius: 6px;
              margin: 1rem auto;
              display: block;
            }

            /* --- CODE BLOCKS (Giả lập giao diện macOS) --- */
            .EditorTheme__code {
              background-color: #1e293b; /* Dark slate */
              color: #f8fafc;
              font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
              display: block;
              padding: 16px;
              font-size: 14px;
              line-height: 1.6;
              margin: 20px 0;
              border-radius: 8px;
              overflow-x: auto;
              position: relative;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            }

            /* Tạo 3 chấm đỏ/vàng/xanh giả lập cửa sổ */
            .EditorTheme__code::before {
              content: "";
              display: block;
              height: 12px;
              width: 12px;
              background: #ff5f56;
              border-radius: 50%;
              box-shadow: 20px 0 0 #ffbd2e, 40px 0 0 #27c93f;
              margin-bottom: 16px;
              opacity: 0.8;
            }

            /* Style cho syntax highlighting (nếu có class) */
            .EditorTheme__tokenComment { color: #94a3b8; font-style: italic; }
            .EditorTheme__tokenPunctuation { color: #cbd5e1; }
            .EditorTheme__tokenProperty { color: #93c5fd; }
            .EditorTheme__tokenSelector { color: #86efac; }
            .EditorTheme__tokenOperator { color: #fca5a5; }
            .EditorTheme__tokenAttr { color: #7dd3fc; }
            .EditorTheme__tokenVariable { color: #fcd34d; }
            .EditorTheme__tokenFunction { color: #f0abfc; }

            /* --- TABLES --- */
            .EditorTheme__table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
              font-size: 0.95em;
              border: 1px solid #e2e8f0;
            }
            .EditorTheme__table th,
            .EditorTheme__table td {
              padding: 12px 15px;
              border: 1px solid #e2e8f0;
            }
            .EditorTheme__table tr:nth-of-type(even) {
              background-color: #f8fafc;
            }
            .EditorTheme__table tr:hover {
              background-color: #f1f5f9;
            }

            /* --- COLLAPSIBLE (Chi tiết) --- */
            .Collapsible__container {
              background-color: #fff;
              border: 1px solid #e5e7eb;
              border-radius: 6px;
              margin-bottom: 1rem;
              overflow: hidden;
            }
            .Collapsible__title {
              padding: 10px 15px;
              background-color: #f9fafb;
              cursor: pointer;
              font-weight: 600;
              user-select: none;
              display: flex;
              align-items: center;
              gap: 8px;
            }
            .Collapsible__title:hover {
              background-color: #f3f4f6;
            }
            .Collapsible__content {
              padding: 15px;
              border-top: 1px solid #e5e7eb;
            }

            /* In ấn đẹp hơn */
            @media print {
              body { background: white; padding: 0; }
              .document-container { box-shadow: none; padding: 0; margin: 0; width: 100%; max-width: 100%; }
            }
          </style>
        </head>
        <body>
          <div class="document-container">
            <h1 style="border-bottom: none; margin-bottom: 0.5rem; font-size: 2.5rem;">${title}</h1>
            <p style="color: #6b7280; font-size: 0.875rem; margin-bottom: 2rem;">
              Exported on ${new Date().toLocaleDateString()}
            </p>
            <hr style="border: 0; border-top: 1px solid #e5e7eb; margin-bottom: 2rem;" />

            ${htmlString}
          </div>
        </body>
        </html>
      `

      const blob = new Blob([fullHtml], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${title
        .replace(/[^a-z0-9]/gi, '_')
        .toLowerCase()}-${new Date().toISOString().slice(0, 10)}.html`
      document.body.appendChild(link)
      link.click()

      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    })
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          onClick={handleDownload}
          title='Download HTML'
          className='w-10 h-10 border border-border bg-background hover:bg-secondary rounded-none flex items-center justify-center transition-all opacity-80 hover:opacity-100 group'
        >
          <FileDown className='h-5 w-5 text-primary group-hover:scale-110 transition-transform' />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Download HTML</TooltipContent>
    </Tooltip>
  )
}
