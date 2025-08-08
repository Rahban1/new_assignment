import { 
  InputIcon,
  LLMIcon,
  OutputIcon,
  TextIcon,
  DocumentIcon,
  FilterIcon,
  MergeIcon,
  SplitIcon,
  VisualizeIcon
} from '../icons';

export const nodePalette = [
  { type: 'customInput', label: 'Input', icon: InputIcon, description: 'Drag to add an input node', shortcut: 'I' },
  { type: 'llm', label: 'LLM', icon: LLMIcon, description: 'Drag to add a language model node', shortcut: 'L' },
  { type: 'customOutput', label: 'Output', icon: OutputIcon, description: 'Drag to add an output node', shortcut: 'O' },
  { type: 'text', label: 'Text', icon: TextIcon, description: 'Drag to add a text processing node', shortcut: 'T' },
  { type: 'document', label: 'Document', icon: DocumentIcon, description: 'Drag to add a document node', shortcut: 'D' },
  { type: 'filter', label: 'Filter', icon: FilterIcon, description: 'Drag to add a filter node', shortcut: 'F' },
  { type: 'merge', label: 'Merge', icon: MergeIcon, description: 'Drag to add a merge node', shortcut: 'M' },
  { type: 'split', label: 'Split', icon: SplitIcon, description: 'Drag to add a split node', shortcut: 'S' },
  { type: 'visualize', label: 'Visualize', icon: VisualizeIcon, description: 'Drag to add a visualization node', shortcut: 'V' },
];