import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $generateHtmlFromNodes } from '@lexical/html'
import { FileDown } from 'lucide-react' // Hoặc icon bạn đang dùng
import { Button } from '~/components/ui/button' // Giả sử bạn dùng Shadcn UI
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~/components/ui/tooltip'

export function DownloadHtmlPlugin() {
  const [editor] = useLexicalComposerContext()

  const handleDownload = () => {
    editor.read(() => {
      const htmlString = $generateHtmlFromNodes(editor, null)

      // 2. Tạo nội dung file hoàn chỉnh (Optional: Thêm style cơ bản nếu muốn)
      const fullHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Exported Content</title>
          <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; padding: 2rem; }
            /* Bạn có thể thêm CSS của theme vào đây nếu muốn file tải về đẹp giống hệt editor */

            .EditorTheme__code {
            background-color: transparent;
            font-family: Menlo, Consolas, Monaco, monospace;
            display: block;
            padding: 8px 8px 8px 52px;
            line-height: 1.53;
            font-size: 13px;
            margin: 0;
            margin-top: 8px;
            margin-bottom: 8px;
            overflow-x: auto;
            border: 1px solid #ccc;
            position: relative;
            border-radius: 8px;
            tab-size: 2;
          }
            .EditorTheme__code:before {
            content: attr(data-gutter);
            position: absolute;
            background-color: transparent;
            border-right: 1px solid #ccc;
            left: 0;
            top: 0;
            padding: 8px;
            color: #777;
            white-space: pre-wrap;
            text-align: right;
            min-width: 25px;
          }
          .EditorTheme__table {
            border-collapse: collapse;
            border-spacing: 0;
            overflow-y: scroll;
            overflow-x: scroll;
              table-layout: fixed;
              width: fit-content;
              width: 100%;
              margin: 0px 0px 30px 0px;
            }
            .EditorTheme__tokenComment {
              color: slategray;
            }
            .EditorTheme__tokenPunctuation {
              color: #999;
            }
            .EditorTheme__tokenProperty {
              color: #905;
            }
            .EditorTheme__tokenSelector {
              color: #690;
            }
            .EditorTheme__tokenOperator {
              color: #9a6e3a;
            }
            .EditorTheme__tokenAttr {
              color: #07a;
            }
            .EditorTheme__tokenVariable {
              color: #e90;
            }
            .EditorTheme__tokenFunction {
              color: #dd4a68;
            }

            .Collapsible__container {
              background-color: var(--background);
              border: 1px solid #ccc;
              border-radius: 0.5rem;
              margin-bottom: 0.5rem;
            }

            .Collapsible__title {
              padding: 0.25rem;
              padding-left: 1rem;
              position: relative;
              font-weight: bold;
              outline: none;
              cursor: pointer;
              list-style-type: disclosure-closed;
              list-style-position: inside;
            }

            .Collapsible__title p {
              display: inline-flex;
            }
            .Collapsible__title::marker {
              color: lightgray;
            }
            .Collapsible__container[open] > .Collapsible__title {
              list-style-type: disclosure-open;
            }

          </style>
        </head>
        <body>
          ${htmlString}
        </body>
        </html>
      `

      const blob = new Blob([fullHtml], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `note-export-${new Date()
        .toISOString()
        .slice(0, 10)}.html`
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
        >
          <FileDown className='h-4 w-4' />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Download HTML</TooltipContent>
    </Tooltip>
  )
}
