/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import type { SerializedEditorState } from 'lexical'
import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router'
import { Editor } from '~/components/editor/block/editor-x/Editor'
import { useGetNoteDetail, useUpdateNote } from '../note/note.query'
import { Skeleton } from '~/components/ui/skeleton'
import { MAX_NOTE_SIZE } from '~/lib/utils'
import { toast } from 'react-toastify'

// ... (Giữ nguyên initialValue và AUTOSAVE_DELAY) ...
const initialValue = {
  root: {
    children: [
      {
        children: [],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'paragraph',
        version: 1,
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    type: 'root',
    version: 1,
  },
} as unknown as SerializedEditorState

const AUTOSAVE_DELAY = 1000

const EditorContent = () => {
  const [searchParams] = useSearchParams()
  const noteId = searchParams.get('noteId')

  const { data: note, isLoading } = useGetNoteDetail(noteId || '')
  const updateNote = useUpdateNote()

  const [editorState, setEditorState] =
    useState<SerializedEditorState>(initialValue)

  // State này chỉ để chặn hiển thị khi chưa load xong note MỚI
  const [isReady, setIsReady] = useState(false)

  // Ref để theo dõi noteId nào đang được load trong Editor
  const currentLoadedNoteIdRef = useRef<string | null>(null)

  const isHydratingRef = useRef(true)
  const lastSavedRef = useRef<string | null>(null)
  const debounceTimerRef = useRef<number | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  /** ---------- HYDRATION (Logic khởi tạo) ---------- */
  useEffect(() => {
    // Nếu chưa có ID hoặc đang loading lần đầu từ server thì bỏ qua
    if (!noteId || isLoading) return

    // QUAN TRỌNG: Nếu noteId hiện tại đã được load rồi thì KHÔNG chạy lại logic hydrate
    // Điều này ngăn chặn việc reset Editor khi autosave cập nhật lại biến 'note'
    if (currentLoadedNoteIdRef.current === noteId) return

    isHydratingRef.current = true
    setIsReady(false) // Chỉ hiện skeleton khi đổi sang note hoàn toàn mới

    try {
      const parsed = note?.content ? JSON.parse(note.content) : initialValue

      setEditorState(parsed)
      // Lưu lại trạng thái ban đầu để so sánh cho autosave
      lastSavedRef.current = note?.content || JSON.stringify(parsed)

      // Đánh dấu là đã load xong note này
      currentLoadedNoteIdRef.current = noteId
    } catch (e) {
      console.error('Parse editor content failed:', e)
      setEditorState(initialValue)
      lastSavedRef.current = JSON.stringify(initialValue)
      currentLoadedNoteIdRef.current = noteId
    } finally {
      // Logic này giữ nguyên để đảm bảo Editor mount xong
      setTimeout(() => {
        isHydratingRef.current = false
        setIsReady(true)
      }, 10)
    }
  }, [noteId, note, isLoading]) // Vẫn giữ dependency, nhưng chặn bằng if check bên trong

  /** ---------- AUTOSAVE ---------- */
  useEffect(() => {
    if (!isReady || !noteId) return
    if (isHydratingRef.current) return

    const currentString = JSON.stringify(editorState)

    const currentSize = new Blob([currentString]).size

    if (currentSize > MAX_NOTE_SIZE) {
      console.error(`Note size exceeded: ${currentSize} / ${MAX_NOTE_SIZE}`)
      toast.error(
        'The content is too long (15MB limit). Please crop or delete the images.'
      )
      return
    }

    // Nếu nội dung không thay đổi so với lần save cuối cùng -> Bỏ qua
    if (currentString === lastSavedRef.current) return

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    debounceTimerRef.current = setTimeout(async () => {
      // Cancel request cũ nếu người dùng gõ tiếp
      abortControllerRef.current?.abort()
      abortControllerRef.current = new AbortController()

      try {
        // Cập nhật lastSavedRef NGAY LẬP TỨC (Optimistic update logic cho local)
        // Để tránh việc useEffect chạy lại check sai
        lastSavedRef.current = currentString

        await updateNote.mutateAsync({
          noteId,
          payload: { content: currentString },
        })

        // Không cần update lastSavedRef ở đây nữa vì đã update trước khi gửi
      } catch (e) {
        if ((e as any)?.name === 'AbortError') return
        console.error('Autosave failed:', e)
        // Nếu lỗi mạng, có thể rollback lastSavedRef ở đây nếu muốn strict
      }
    }, AUTOSAVE_DELAY)

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [editorState, noteId]) // Bỏ note ra khỏi dependency này nếu có

  /** ---------- UI ---------- */
  if (!noteId) {
    return (
      <div className='p-10 text-center text-gray-400 '>
        Select a note to view
      </div>
    )
  }

  // Logic hiển thị Skeleton: Chỉ khi đổi note mới hoặc chưa ready
  if ((isLoading && !currentLoadedNoteIdRef.current) || !isReady) {
    return (
      <div className='p-4 space-y-4'>
        <Skeleton className='h-10 w-3/4' />
        <Skeleton className='h-96 w-full' />
      </div>
    )
  }

  return (
    <div className='relative h-full min-h-0 '>
      {/* Optional: Indicator nhỏ báo đang save */}
      {updateNote.isPending && (
        <div className='absolute top-2 right-2 text-xs text-green-400'>
          Saving...
        </div>
      )}

      <Editor
        key={noteId} // Reset editor instance khi đổi note (Good practice)
        editorSerializedState={editorState}
        onSerializedChange={setEditorState}
      />
    </div>
  )
}

export default EditorContent
