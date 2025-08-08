import { InputNode } from '../nodes/inputNode';
import { LLMNode } from '../nodes/llmNode';
import { OutputNode } from '../nodes/outputNode';
import { TextNode } from '../nodes/textNode';
import { DocumentNode } from '../nodes/documentNode';
import { FilterNode } from '../nodes/filterNode';
import { MergeNode } from '../nodes/mergeNode';
import { SplitNode } from '../nodes/splitNode';
import { VisualizeNode } from '../nodes/visualizeNode';

export const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  document: DocumentNode,
  filter: FilterNode,
  merge: MergeNode,
  split: SplitNode,
  visualize: VisualizeNode,
};