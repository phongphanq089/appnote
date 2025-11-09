import { CodeHighlightNode, CodeNode } from '@lexical/code'
import { HashtagNode } from '@lexical/hashtag'
import { AutoLinkNode, LinkNode } from '@lexical/link'
import { ListItemNode, ListNode } from '@lexical/list'
import { OverflowNode } from '@lexical/overflow'
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table'
import {
  ParagraphNode,
  TextNode,
  type Klass,
  type LexicalNode,
  type LexicalNodeReplacement,
} from 'lexical'
import { MentionNode } from '../../nodes/mention-node'
import { ImageNode } from '../../nodes/image-node'
import { EmojiNode } from '../../nodes/emoji-node'
import { KeywordNode } from '../../nodes/keyword-node'
import { LayoutContainerNode } from '../../nodes/layout-container-node'
import { LayoutItemNode } from '../../nodes/layout-item-node'
import { TweetNode } from '../../nodes/embeds/tweet-node'
import { YouTubeNode } from '../../nodes/embeds/youtube-node'
import { AutocompleteNode } from '../../nodes/autocomplete-node'

export const nodes: ReadonlyArray<Klass<LexicalNode> | LexicalNodeReplacement> =
  [
    HeadingNode,
    ParagraphNode,
    TextNode,
    QuoteNode,
    ListNode,
    ListItemNode,
    LinkNode,
    OverflowNode,
    HashtagNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    CodeNode,
    CodeHighlightNode,
    HorizontalRuleNode,
    MentionNode,
    ImageNode,
    EmojiNode,
    KeywordNode,
    LayoutContainerNode,
    LayoutItemNode,
    AutoLinkNode,
    TweetNode,
    YouTubeNode,
    AutocompleteNode,
  ]
