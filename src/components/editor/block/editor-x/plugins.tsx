import { useState } from 'react'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '~/components/editor/editor-ui/content-editable'
import { ToolbarPlugin } from '~/components/editor/plugins/toolbar/toolbar-plugin'
import { HistoryToolbarPlugin } from '../../plugins/toolbar/history-toolbar-plugin'
import { Separator } from '~/components/ui/separator'
import { BlockFormatDropDown } from '../../plugins/toolbar/block-format-toolbar-plugin'
import { FormatParagraph } from '../../plugins/toolbar/block-format/format-paragraph'
import { FormatHeading } from '../../plugins/toolbar/block-format/format-heading'
import { FormatNumberedList } from '../../plugins/toolbar/block-format/format-numbered-list'
import { FormatBulletedList } from '../../plugins/toolbar/block-format/format-bulleted-list'
import { FormatCheckList } from '../../plugins/toolbar/block-format/format-check-list'
import { FormatCodeBlock } from '../../plugins/toolbar/block-format/format-code-block'
import { FormatQuote } from '../../plugins/toolbar/block-format/format-quote'
import { CodeLanguageToolbarPlugin } from '../../plugins/toolbar/code-language-toolbar-plugin'
import { FontFamilyToolbarPlugin } from '../../plugins/toolbar/font-family-toolbar-plugin'
import { FontSizeToolbarPlugin } from '../../plugins/toolbar/font-size-toolbar-plugin'
import { FontFormatToolbarPlugin } from '../../plugins/toolbar/font-format-toolbar-plugin'
import { SubSuperToolbarPlugin } from '../../plugins/toolbar/subsuper-toolbar-plugin'
import { LinkToolbarPlugin } from '../../plugins/toolbar/link-toolbar-plugin'
import { FloatingLinkEditorPlugin } from '../../plugins/floating-link-editor-plugin'
import { FloatingTextFormatToolbarPlugin } from '../../plugins/floating-text-format-plugin'
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import { ClearFormattingToolbarPlugin } from '../../plugins/toolbar/clear-formatting-toolbar-plugin'
import { FontColorToolbarPlugin } from '../../plugins/toolbar/font-color-toolbar-plugin'
import { FontBackgroundToolbarPlugin } from '../../plugins/toolbar/font-background-toolbar-plugin'
import { ElementFormatToolbarPlugin } from '../../plugins/toolbar/element-format-toolbar-plugin'
import { BlockInsertPlugin } from '../../plugins/toolbar/block-insert-plugin'
import { InsertHorizontalRule } from '../../plugins/toolbar/block-insert/insert-horizontal-rule'
import { InsertImage } from '../../plugins/toolbar/block-insert/insert-image'
import { InsertTable } from '../../plugins/toolbar/block-insert/insert-table'
import { InsertColumnsLayout } from '../../plugins/toolbar/block-insert/insert-columns-layout'
import { InsertEmbeds } from '../../plugins/toolbar/block-insert/insert-embeds'
import { ClickableLinkPlugin } from '@lexical/react/LexicalClickableLinkPlugin'
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin'
import { HorizontalRulePlugin } from '@lexical/react/LexicalHorizontalRulePlugin'
import { TablePlugin } from '@lexical/react/LexicalTablePlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin'
import { HashtagPlugin } from '@lexical/react/LexicalHashtagPlugin'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { MentionsPlugin } from '../../plugins/mentions-plugin'
import { DraggableBlockPlugin } from '../../plugins/draggable-block-plugin'
import { KeywordsPlugin } from '../../plugins/keywords-plugin'
import { EmojisPlugin } from '../../plugins/emojis-plugin'
import { ImagesPlugin } from '../../plugins/images-plugin'
import { LayoutPlugin } from '../../plugins/layout-plugin'
import { AutoEmbedPlugin } from '../../plugins/embeds/auto-embed-plugin'
import { TwitterPlugin } from '../../plugins/embeds/twitter-plugin'
import { YouTubePlugin } from '../../plugins/embeds/youtube-plugin'
import { CodeHighlightPlugin } from '../../plugins/code-highlight-plugin'
import { CodeActionMenuPlugin } from '../../plugins/code-action-menu-plugin'
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin'
import { TABLE } from '../../transformers/markdown-table-transformer'
import { HR } from '../../transformers/markdown-hr-transformer'
import { IMAGE } from '../../transformers/markdown-image-transformer'
import { EMOJI } from '../../transformers/markdown-emoji-transformer'
import { TWEET } from '../../transformers/markdown-tweet-transformer'
import {
  CHECK_LIST,
  ELEMENT_TRANSFORMERS,
  MULTILINE_ELEMENT_TRANSFORMERS,
  TEXT_FORMAT_TRANSFORMERS,
  TEXT_MATCH_TRANSFORMERS,
} from '@lexical/markdown'
import { TypingPerfPlugin } from '../../plugins/typing-pref-plugin'
import { TabFocusPlugin } from '../../plugins/tab-focus-plugin'
import { AutocompletePlugin } from '../../plugins/autocomplete-plugin'

import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin'
import { AutoLinkPlugin } from '../../plugins/auto-link-plugin'
import { ComponentPickerMenuPlugin } from '../../plugins/component-picker-menu-plugin'
import {
  DynamicTablePickerPlugin,
  TablePickerPlugin,
} from '../../plugins/picker/table-picker-plugin'
import { ContextMenuPlugin } from '../../plugins/context-menu-plugin'
import { DragDropPastePlugin } from '../../plugins/drag-drop-paste-plugin'
import { EmojiPickerPlugin } from '../../plugins/emoji-picker-plugin'
import { ParagraphPickerPlugin } from '../../plugins/picker/paragraph-picker-plugin'
import { HeadingPickerPlugin } from '../../plugins/picker/heading-picker-plugin'
import { CheckListPickerPlugin } from '../../plugins/picker/check-list-picker-plugin'
import { NumberedListPickerPlugin } from '../../plugins/picker/numbered-list-picker-plugin'
import { BulletedListPickerPlugin } from '../../plugins/picker/bulleted-list-picker-plugin'
import { QuotePickerPlugin } from '../../plugins/picker/quote-picker-plugin'
import { CodePickerPlugin } from '../../plugins/picker/code-picker-plugin'
import { DividerPickerPlugin } from '../../plugins/picker/divider-picker-plugin'
import { EmbedsPickerPlugin } from '../../plugins/picker/embeds-picker-plugin'
import { ImagePickerPlugin } from '../../plugins/picker/image-picker-plugin'
import { ColumnsLayoutPickerPlugin } from '../../plugins/picker/columns-layout-picker-plugin'
import { AlignmentPickerPlugin } from '../../plugins/picker/alignment-picker-plugin'
import { ActionsPlugin } from '../../plugins/actions/actions-plugin'
import { MaxLengthPlugin } from '../../plugins/actions/max-length-plugin'
import { CharacterLimitPlugin } from '../../plugins/actions/character-limit-plugin'
import { CounterCharacterPlugin } from '../../plugins/actions/counter-character-plugin'
import { SpeechToTextPlugin } from '../../plugins/actions/speech-to-text-plugin'
import { ShareContentPlugin } from '../../plugins/actions/share-content-plugin'
import { ImportExportPlugin } from '../../plugins/actions/import-export-plugin'
import { MarkdownTogglePlugin } from '../../plugins/actions/markdown-toggle-plugin'
import { EditModeTogglePlugin } from '../../plugins/actions/edit-mode-toggle-plugin'
import { ClearEditorActionPlugin } from '../../plugins/actions/clear-editor-plugin'
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin'
import { TreeViewPlugin } from '../../plugins/actions/tree-view-plugin'
import { ScrollArea, ScrollBar } from '~/components/ui/scroll-area'
import { MAX_NOTE_SIZE } from '~/lib/utils'

const placeholder = 'Press / for commands...'
const maxLength = MAX_NOTE_SIZE

export function Plugins() {
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null)

  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false)

  // console.log(floatingAnchorElem, '=========>')

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem)
    }
  }

  return (
    <div className='relative flex flex-col h-full w-full '>
      <div className='flex-none z-10 bg-background '>
        <ToolbarPlugin>
          {({ blockType }) => (
            <ScrollArea className='w-full mx-auto flex items-center border-b p-1 bg-muted'>
              <div className='flex items-center gap-1 md:flex-wrap p-2'>
                <HistoryToolbarPlugin />
                <Separator orientation='vertical' className='h-7!' />
                <BlockFormatDropDown>
                  <FormatParagraph />
                  <FormatHeading
                    levels={['h1', 'h2', 'h3', 'h4', 'h5', 'h6']}
                  />
                  <FormatNumberedList />
                  <FormatBulletedList />
                  <FormatCheckList />
                  <FormatCodeBlock />
                  <FormatQuote />
                </BlockFormatDropDown>
                {blockType === 'code' ? (
                  <CodeLanguageToolbarPlugin />
                ) : (
                  <>
                    <FontFamilyToolbarPlugin />
                    <FontSizeToolbarPlugin />
                    <Separator orientation='vertical' className='h-7!' />
                    <FontFormatToolbarPlugin />
                    <Separator orientation='vertical' className='h-7!' />
                    <SubSuperToolbarPlugin />
                    <LinkToolbarPlugin setIsLinkEditMode={setIsLinkEditMode} />
                    <Separator orientation='vertical' className='h-7!' />
                    <ClearFormattingToolbarPlugin />
                    <Separator orientation='vertical' className='h-7!' />
                    <FontColorToolbarPlugin />
                    <FontBackgroundToolbarPlugin />
                    <Separator orientation='vertical' className='h-7!' />
                    <ElementFormatToolbarPlugin />
                    <Separator orientation='vertical' className='h-7!' />
                    <BlockInsertPlugin>
                      <InsertHorizontalRule />
                      <InsertImage />
                      <InsertTable />
                      <InsertColumnsLayout />
                      <InsertEmbeds />
                    </BlockInsertPlugin>
                  </>
                )}
              </div>
              <ScrollBar orientation='horizontal' />
            </ScrollArea>
          )}
        </ToolbarPlugin>
      </div>

      <div className='relative flex-1 min-h-0 '>
        <AutoFocusPlugin />
        <RichTextPlugin
          contentEditable={
            <ScrollArea className='h-full w-full' type='always'>
              <div className='h-full min-h-full ' ref={onRef}>
                <ContentEditable
                  placeholder={placeholder}
                  // THAY ĐỔI 4: Bỏ overflow-auto ở đây vì ScrollArea đã lo rồi.
                  // Dùng min-h-full để editor luôn full chiều cao dù không có chữ
                  className='ContentEditable__root relative block min-h-full px-8 py-4 pb-100 focus:outline-none'
                />
              </div>
            </ScrollArea>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />

        <ClickableLinkPlugin />
        <CheckListPlugin />
        <HorizontalRulePlugin />
        <TablePlugin />
        <ListPlugin />
        <TabIndentationPlugin />
        <HashtagPlugin />
        <HistoryPlugin />

        <MentionsPlugin />
        <DraggableBlockPlugin anchorElem={floatingAnchorElem} />
        <KeywordsPlugin />
        <EmojisPlugin />
        <ImagesPlugin />

        <LayoutPlugin />

        <AutoEmbedPlugin />
        <TwitterPlugin />
        <YouTubePlugin />

        <CodeHighlightPlugin />
        <CodeActionMenuPlugin anchorElem={floatingAnchorElem} />

        <MarkdownShortcutPlugin
          transformers={[
            TABLE,
            HR,
            IMAGE,
            EMOJI,
            TWEET,
            CHECK_LIST,
            ...ELEMENT_TRANSFORMERS,
            ...MULTILINE_ELEMENT_TRANSFORMERS,
            ...TEXT_FORMAT_TRANSFORMERS,
            ...TEXT_MATCH_TRANSFORMERS,
          ]}
        />
        <TypingPerfPlugin />
        <TabFocusPlugin />
        <AutocompletePlugin />
        <AutoLinkPlugin />
        <LinkPlugin />

        <ComponentPickerMenuPlugin
          baseOptions={[
            ParagraphPickerPlugin(),
            HeadingPickerPlugin({ n: 1 }),
            HeadingPickerPlugin({ n: 2 }),
            HeadingPickerPlugin({ n: 3 }),
            TablePickerPlugin(),
            CheckListPickerPlugin(),
            NumberedListPickerPlugin(),
            BulletedListPickerPlugin(),
            QuotePickerPlugin(),
            CodePickerPlugin(),
            DividerPickerPlugin(),
            EmbedsPickerPlugin({ embed: 'tweet' }),
            EmbedsPickerPlugin({ embed: 'youtube-video' }),
            ImagePickerPlugin(),
            ColumnsLayoutPickerPlugin(),
            AlignmentPickerPlugin({ alignment: 'left' }),
            AlignmentPickerPlugin({ alignment: 'center' }),
            AlignmentPickerPlugin({ alignment: 'right' }),
            AlignmentPickerPlugin({ alignment: 'justify' }),
          ]}
          dynamicOptionsFn={DynamicTablePickerPlugin}
        />

        <ContextMenuPlugin />
        <DragDropPastePlugin />
        <EmojiPickerPlugin />

        <FloatingLinkEditorPlugin
          anchorElem={floatingAnchorElem}
          isLinkEditMode={isLinkEditMode}
          setIsLinkEditMode={setIsLinkEditMode}
        />
        <FloatingTextFormatToolbarPlugin
          anchorElem={floatingAnchorElem}
          setIsLinkEditMode={setIsLinkEditMode}
        />
      </div>
      <ActionsPlugin>
        <ScrollArea className='w-full mx-auto flex items-center bg-muted border-b p-1'>
          <div className='clear-both flex items-center justify-between gap-5'>
            <div className='flex flex-1 justify-start'>
              <MaxLengthPlugin maxLength={maxLength} />
              <CharacterLimitPlugin maxLength={maxLength} charset='UTF-16' />
            </div>
            <div>
              <CounterCharacterPlugin charset='UTF-16' />
            </div>
            <div className='flex flex-1 justify-end'>
              <SpeechToTextPlugin />
              <ShareContentPlugin />
              <ImportExportPlugin />
              <MarkdownTogglePlugin
                shouldPreserveNewLinesInMarkdown={true}
                transformers={[
                  TABLE,
                  HR,
                  IMAGE,
                  EMOJI,
                  TWEET,
                  CHECK_LIST,
                  ...ELEMENT_TRANSFORMERS,
                  ...MULTILINE_ELEMENT_TRANSFORMERS,
                  ...TEXT_FORMAT_TRANSFORMERS,
                  ...TEXT_MATCH_TRANSFORMERS,
                ]}
              />
              <EditModeTogglePlugin />
              <>
                <ClearEditorActionPlugin />
                <ClearEditorPlugin />
              </>
              <TreeViewPlugin />
            </div>
          </div>
          <ScrollBar orientation='horizontal' />
        </ScrollArea>
      </ActionsPlugin>
    </div>
  )
}
