// Internal documentation primitives & utilities (not public UI primitives).
export {
  DocAnatomy,
  DocArticle,
  DocCallout,
  DocSection,
  DocTable,
  type DocArticleProps,
  type DocNeighbour,
  type DocSectionProps,
  type DocTableColumn,
  type DocTableProps,
} from './primitives/doc-article'
export {
  DocChartCard,
  type DocChartCardProps,
} from './primitives/doc-chart-card'
export {
  DocCodeBlock,
  DocCodeTabs,
  type DocCodeBlockProps,
  type DocCodeFile,
  type DocCodeTabsProps,
} from './primitives/doc-code-block'
export {
  DocCopyButton,
  type DocCopyButtonProps,
} from './primitives/doc-copy-button'
export { DocFrame, type DocFrameProps } from './primitives/doc-frame'
export {
  DocFrameworkIcon,
  DocFrameworkSelect,
} from './primitives/doc-framework-select'
export {
  DocPreview,
  type DocPreviewProps,
} from './primitives/doc-preview'
export {
  DocConsole,
  DocInstallTerminal,
  DocLogContext,
  useDocLog,
  type DocConsoleProps,
  type DocInstallTerminalProps,
  type DocLogFn,
} from './primitives/doc-terminal'
export { DocToc, type DocTocItem, type DocTocProps } from './primitives/doc-toc'
export { highlightCode, type CodeLanguage } from './highlight'
export {
  PACKAGE_MANAGERS,
  TARGET_FRAMEWORKS,
  formatComponentsJson,
  formatExecCommand,
  formatInstallCommand,
  getFrameworkMeta,
  usePackageManager,
  useTargetFramework,
  type PackageManager,
  type TargetFramework,
} from './preferences'
export { createSlugger, slugify } from './slug'
export {
  extractComponentMeta,
  extractGroupSnippet,
  loadComponentSources,
  loadRegistryItem,
  type ComponentMeta,
  type ComponentSources,
  type RegistryItemFile,
  type RegistryItemJson,
} from './sources'
