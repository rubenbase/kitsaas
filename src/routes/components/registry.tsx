import type { JSX } from '@solidjs/web'

import { AccordionDemo } from './demos/accordion'
import { AlertDemo } from './demos/alert'
import { AlertDialogDemo } from './demos/alert-dialog'
import { AutocompleteDemo } from './demos/autocomplete'
import { AvatarDemo } from './demos/avatar'
import { BadgeDemo } from './demos/badge'
import { ButtonDemo } from './demos/button'
import { ButtonGroupDemo } from './demos/button-group'
import { CalendarDemo } from './demos/calendar'
import { CarouselDemo } from './demos/carousel'
import { CheckboxDemo } from './demos/checkbox'
import { CollapsibleDemo } from './demos/collapsible'
import { ColorPickerDemo } from './demos/color-picker'
import { ComboboxDemo } from './demos/combobox'
import { CommandDemo } from './demos/command'
import { DateInputDemo } from './demos/date-input'
import { DatePickerDemo } from './demos/date-picker'
import { DialogDemo } from './demos/dialog'
import { DrawerDemo } from './demos/drawer'
import { FieldDemo } from './demos/field'
import { FileInputDemo } from './demos/file-input'
import { HoverCardDemo } from './demos/hover-card'
import { ImageCropperDemo } from './demos/image-cropper'
import { InputDemo } from './demos/input'
import { LabelDemo } from './demos/label'
import { ListboxDemo } from './demos/listbox'
import { MenuDemo } from './demos/menu'
import { MenubarDemo } from './demos/menubar'
import { MeterDemo } from './demos/meter'
import { NavigationMenuDemo } from './demos/navigation-menu'
import { NumberInputDemo } from './demos/number-input'
import { OtpInputDemo } from './demos/otp-input'
import { PaginationDemo } from './demos/pagination'
import { PasswordInputDemo } from './demos/password-input'
import { PopoverDemo } from './demos/popover'
import { PreferencesDemo } from './demos/preferences'
import { ProgressDemo } from './demos/progress'
import { RadioDemo } from './demos/radio'
import { RatingDemo } from './demos/rating'
import { ResizableDemo } from './demos/resizable'
import { ScrollAreaDemo } from './demos/scroll-area'
import { SegmentedControlDemo } from './demos/segmented-control'
import { SelectDemo } from './demos/select'
import { SeparatorDemo } from './demos/separator'
import { SidebarDemo } from './demos/sidebar'
import { SliderDemo } from './demos/slider'
import { SwitchDemo } from './demos/switch'
import { TabsDemo } from './demos/tabs'
import { TextareaDemo } from './demos/textarea'
import { TimeInputDemo } from './demos/time-input'
import { TimelineDemo } from './demos/timeline'
import { ToastDemo } from './demos/toast'
import { ToggleDemo } from './demos/toggle'
import { TokenInputDemo } from './demos/token-input'
import { ToolbarDemo } from './demos/toolbar'
import { TooltipDemo } from './demos/tooltip'
import { TreeDemo } from './demos/tree'
import { TriggerMenuDemo } from './demos/trigger-menu'
import { WaterfallDemo } from './demos/waterfall'

export type ComponentEntry = {
  slug: string
  name: string
  description: string
  packageName: string
  note?: string
  Demo: () => JSX.Element
}

export const componentCatalog: ComponentEntry[] = [
  {
    slug: 'accordion',
    name: 'Accordion',
    description:
      'Opens one section at a time unless multiple is set; every trigger stays in the tab order, disabled ones included.',
    packageName: '@ui-sdk/solid/accordion',
    Demo: AccordionDemo,
  },
  {
    slug: 'alert',
    name: 'Alert',
    description:
      'An inline callout for a status or warning that stays on the page, in neutral, info, success, warning and danger, with optional title, icon and action.',
    packageName: '@ui-sdk/solid',
    Demo: AlertDemo,
  },
  {
    slug: 'alert-dialog',
    name: 'Alert Dialog',
    description:
      'Asks for explicit confirmation before a critical or destructive action, supporting async confirm handlers and imperative confirm flows.',
    packageName: '@ui-sdk/solid/alert-dialog',
    Demo: AlertDialogDemo,
  },
  {
    slug: 'autocomplete',
    name: 'Autocomplete',
    description:
      'Suggests matching options while you type without restricting free-form input, with inline completion, highlighting, and live status updates.',
    packageName: '@ui-sdk/solid/autocomplete',
    Demo: AutocompleteDemo,
  },
  {
    slug: 'avatar',
    name: 'Avatar',
    description:
      'Shows initials until the image loads and keeps them if it fails, reporting the loading status on every part.',
    packageName: '@ui-sdk/solid/avatar',
    Demo: AvatarDemo,
  },
  {
    slug: 'badge',
    name: 'Badge',
    description:
      'A small inline label for metadata and status chips, ported from opencode: compact or standard, in neutral, accent, subtle and danger, plus info, success and warning.',
    packageName: '@ui-sdk/solid',
    Demo: BadgeDemo,
  },
  {
    slug: 'button',
    name: 'Button',
    description:
      'Stays pending while an async action runs, handles disabled state, and renders as a link when given an href.',
    packageName: '@ui-sdk/solid/button',
    Demo: ButtonDemo,
  },
  {
    slug: 'button-group',
    name: 'Button Group',
    description:
      'Joins related buttons, inputs, and menus into one segmented control, with separators and nested groups.',
    packageName: '@ui-sdk/solid/separator',
    Demo: ButtonGroupDemo,
  },
  {
    slug: 'calendar',
    name: 'Calendar',
    description:
      'Picks a single date, multiple dates, or a continuous date range from a keyboard-navigable month grid.',
    packageName: '@ui-sdk/solid/calendar',
    Demo: CalendarDemo,
  },
  {
    slug: 'carousel',
    name: 'Carousel',
    description:
      'Pages through slides using native scroll snap, arrow controls, progress tracking, and pagination indicators.',
    packageName: '@ui-sdk/solid/carousel',
    Demo: CarouselDemo,
  },
  {
    slug: 'checkbox',
    name: 'Checkbox',
    description:
      'Reports checked, unchecked and mixed through ARIA, and keeps a hidden native input in sync, so it submits and resets with its form.',
    packageName: '@ui-sdk/solid/checkbox',
    Demo: CheckboxDemo,
  },
  {
    slug: 'collapsible',
    name: 'Collapsible',
    description:
      'Shows and hides one panel; the trigger stays focusable and keeps its contents only while it is open.',
    packageName: '@ui-sdk/solid/collapsible',
    Demo: CollapsibleDemo,
  },
  {
    slug: 'color-picker',
    name: 'Color Picker',
    description:
      'Selects colors across a 2D area, hue and alpha sliders, CSS/channel inputs, swatches, and an optional eyedropper.',
    packageName: '@ui-sdk/solid/color-picker',
    Demo: ColorPickerDemo,
  },
  {
    slug: 'combobox',
    name: 'Combobox',
    description:
      'Searches a list of options to choose one or several values, with selection chips, groups, select-all, and creatable entries.',
    packageName: '@ui-sdk/solid/combobox',
    Demo: ComboboxDemo,
  },
  {
    slug: 'command',
    name: 'Command',
    description:
      'Fuzzy-searches actions and grouped commands with keyboard shortcut hints and nested sub-views, inline or inside a dialog.',
    packageName: '@ui-sdk/solid/command',
    Demo: CommandDemo,
  },
  {
    slug: 'date-input',
    name: 'Date Input',
    description:
      'Edits dates and date-times one locale-ordered segment at a time with arrow-key stepping and native form submission.',
    packageName: '@ui-sdk/solid/date-input',
    Demo: DateInputDemo,
  },
  {
    slug: 'date-picker',
    name: 'Date Picker',
    description:
      'Combines a segmented date field with a floating calendar popover for single dates, ranges, and quick presets.',
    packageName: '@ui-sdk/solid/date-picker',
    Demo: DatePickerDemo,
  },
  {
    slug: 'dialog',
    name: 'Dialog',
    description:
      'Opens a task in the top layer, traps focus, closes on Escape, a press outside or a close part, and returns focus to its trigger.',
    packageName: '@ui-sdk/solid/dialog',
    Demo: DialogDemo,
  },
  {
    slug: 'drawer',
    name: 'Drawer',
    description:
      'Slides a draggable sheet in from any screen edge with snap points, a resize handle, and nested stacking.',
    packageName: '@ui-sdk/solid/drawer',
    Demo: DrawerDemo,
  },
  {
    slug: 'field',
    name: 'Field',
    description:
      'Ties a control to its label and description, and marks every part invalid once a submit finds a problem.',
    packageName: '@ui-sdk/solid/field',
    Demo: FieldDemo,
  },
  {
    slug: 'file-input',
    name: 'File Input',
    description:
      'Accepts dropped, pasted, or browsed files with validation, file list management, and form submission.',
    packageName: '@ui-sdk/solid/file-input',
    Demo: FileInputDemo,
  },
  {
    slug: 'hover-card',
    name: 'Hover Card',
    description:
      'Previews a link on hover or keyboard focus, stays open while the pointer crosses the gap, and still follows the link on press.',
    packageName: '@ui-sdk/solid/hover-card',
    Demo: HoverCardDemo,
  },
  {
    slug: 'image-cropper',
    name: 'Image Cropper',
    description:
      'Crops images by resizing a selection box or panning and zooming behind a fixed frame, with aspect-ratio, rotate, and flip controls.',
    packageName: '@ui-sdk/solid/image-cropper',
    Demo: ImageCropperDemo,
  },
  {
    slug: 'input',
    name: 'Input',
    description:
      'Reports typing, clearing and a form reset with their reasons, and clears from a group part that returns focus to the field.',
    packageName: '@ui-sdk/solid/input',
    Demo: InputDemo,
  },
  {
    slug: 'label',
    name: 'Label',
    description:
      'Names native inputs and custom controls alike, forwarding clicks to activate or focus the associated control.',
    packageName: '@ui-sdk/solid/label',
    Demo: LabelDemo,
  },
  {
    slug: 'listbox',
    name: 'Listbox',
    description:
      'Presents an always-visible option list with roving focus, typeahead, groups, and single or multi-range selection.',
    packageName: '@ui-sdk/solid/listbox',
    Demo: ListboxDemo,
  },
  {
    slug: 'menu',
    name: 'Menu',
    description:
      'Opens a list of actions with the arrow keys, typeahead and Escape, keeping checked items in place and a submenu open under the pointer.',
    packageName: '@ui-sdk/solid/menu',
    Demo: MenuDemo,
  },
  {
    slug: 'menubar',
    name: 'Menubar',
    description:
      'Connects top-level application menus under a single tab stop so arrow keys and hover glide seamlessly between them.',
    packageName: '@ui-sdk/solid/menubar',
    Demo: MenubarDemo,
  },
  {
    slug: 'meter',
    name: 'Meter',
    description:
      'Displays a bounded measurement such as storage or quota, classifying optimum, suboptimum, and critical ranges semantically.',
    packageName: '@ui-sdk/solid/meter',
    Demo: MeterDemo,
  },
  {
    slug: 'navigation-menu',
    name: 'Navigation Menu',
    description:
      'Groups site navigation links into floating disclosure panels with keyboard support and a sliding active indicator.',
    packageName: '@ui-sdk/solid/navigation-menu',
    Demo: NavigationMenuDemo,
  },
  {
    slug: 'number-input',
    name: 'Number Input',
    description:
      'Formats locale-aware numbers, currencies, and units with stepper buttons, keyboard stepping, and scrubbable labels.',
    packageName: '@ui-sdk/solid/number-input',
    Demo: NumberInputDemo,
  },
  {
    slug: 'otp-input',
    name: 'OTP Input',
    description:
      'Collects one-time verification codes across individual slots with paste handling, autofill, and native form validation.',
    packageName: '@ui-sdk/solid/otp-input',
    Demo: OtpInputDemo,
  },
  {
    slug: 'pagination',
    name: 'Pagination',
    description:
      'Navigates multi-page datasets with ellipsis collapsing, first/previous/next/last controls, and router-friendly links.',
    packageName: '@ui-sdk/solid/pagination',
    Demo: PaginationDemo,
  },
  {
    slug: 'password-input',
    name: 'Password Input',
    description:
      'Enters secrets with an integrated visibility toggle button and full Field validation support.',
    packageName: '@ui-sdk/solid/password-input',
    Demo: PasswordInputDemo,
  },
  {
    slug: 'popover',
    name: 'Popover',
    description:
      'Opens a small task beside its trigger, moves focus in, flips and shifts to stay in view, and returns focus on close.',
    packageName: '@ui-sdk/solid/popover',
    Demo: PopoverDemo,
  },
  {
    slug: 'preferences',
    name: 'Preferences',
    description:
      'Applies storage-backed user preferences onto data attributes so CSS can adapt before hydration without flash.',
    packageName: '@ui-sdk/solid/preferences',
    Demo: PreferencesDemo,
  },
  {
    slug: 'progress',
    name: 'Progress',
    description:
      'Reports how far a task has come through the progressbar role, and sweeps while the value is unknown.',
    packageName: '@ui-sdk/solid/progress',
    Demo: ProgressDemo,
  },
  {
    slug: 'radio',
    name: 'Radio',
    description:
      'Keeps one value across the group, checks as the arrow keys move, and submits the checked option with its form.',
    packageName: '@ui-sdk/solid/radio',
    Demo: RadioDemo,
  },
  {
    slug: 'rating',
    name: 'Rating',
    description:
      'Picks whole or half-star ratings with hover preview, arrow-key navigation, and read-only average displays.',
    packageName: '@ui-sdk/solid/rating',
    Demo: RatingDemo,
  },
  {
    slug: 'resizable',
    name: 'Resizable',
    description:
      'Splits layouts into draggable, keyboard-resizable, and collapsible panels horizontally, vertically, or nested.',
    packageName: '@ui-sdk/solid/resizable',
    Demo: ResizableDemo,
  },
  {
    slug: 'scroll-area',
    name: 'Scroll Area',
    description:
      'Pairs native scrolling with styled thin scrollbars, edge overflow fades, and stick-to-end streaming behavior.',
    packageName: '@ui-sdk/solid/scroll-area',
    Demo: ScrollAreaDemo,
  },
  {
    slug: 'segmented-control',
    name: 'Segmented Control',
    description:
      'Keeps one option checked with a single tab stop, moves the selection with the arrow keys, and slides its indicator to the checked item.',
    packageName: '@ui-sdk/solid/segmented-control',
    note: 'Upstream’s stylesheet lays out a single horizontal row, so there is no vertical variant: orientation="vertical" still needs its own layout rules. With nothing checked the measured indicator has no box, so no highlight shows.',
    Demo: SegmentedControlDemo,
  },
  {
    slug: 'select',
    name: 'Select',
    description:
      'Opens a listbox under the trigger, moves the highlight with the arrow keys and typeahead, and keeps the chosen value — or values, with multiple — in the form.',
    packageName: '@ui-sdk/solid/select',
    note: 'Upstream’s Select is single-select; the Multiple group is Kitsaas wiring ui-sdk’s multiple — the value becomes an array, the list stays open while you toggle, and the trigger summarizes after two labels. Its custom scroll thumb belongs to opencode’s own scroll container; here the list stops at 12rem and scrolls natively.',
    Demo: SelectDemo,
  },
  {
    slug: 'separator',
    name: 'Separator',
    description:
      'Divides content with a horizontal or vertical hairline, announced to screen readers unless it is decorative.',
    packageName: '@ui-sdk/solid/separator',
    Demo: SeparatorDemo,
  },
  {
    slug: 'sidebar',
    name: 'Sidebar',
    description:
      'Composable application sidebar built on @ui-sdk/core with collapsible offcanvas and icon modes, floating and inset variants, groups, submenus, rail toggle, and mobile drawer support.',
    packageName: '@ui-sdk/core (custom)',
    Demo: SidebarDemo,
  },
  {
    slug: 'slider',
    name: 'Slider',
    description:
      'Adjusts single values or multi-thumb ranges with pointer dragging, stepped marks, and keyboard controls.',
    packageName: '@ui-sdk/solid/slider',
    Demo: SliderDemo,
  },
  {
    slug: 'switch',
    name: 'Switch',
    description:
      'Turns a setting on and off in place, keeps a hidden native input in sync, and submits and resets with its form.',
    packageName: '@ui-sdk/solid/switch',
    Demo: SwitchDemo,
  },
  {
    slug: 'tabs',
    name: 'Tabs',
    description:
      'Switches panels with one tab selected at a time, moving focus and selection with the arrow keys and tying each tab to its panel.',
    packageName: '@ui-sdk/solid/tabs',
    note: 'The page tab bar in the app shell hand-rolls this same underline look for routes, so it overlaps with the underline variant here.',
    Demo: TabsDemo,
  },
  {
    slug: 'textarea',
    name: 'Textarea',
    description:
      "Reports typing, a form reset and a controller's changes with their reasons, and grows with its text when autoResize is set.",
    packageName: '@ui-sdk/solid/textarea',
    Demo: TextareaDemo,
  },
  {
    slug: 'time-input',
    name: 'Time Input',
    description:
      'Edits 12-hour or 24-hour times segment by segment with optional seconds and min/max validation.',
    packageName: '@ui-sdk/solid/time-input',
    Demo: TimeInputDemo,
  },
  {
    slug: 'timeline',
    name: 'Timeline',
    description:
      'Presents chronological events, changelogs, or workflow milestones with connectors, status markers, and arrow-key navigation.',
    packageName: '@ui-sdk/solid/timeline',
    Demo: TimelineDemo,
  },
  {
    slug: 'toast',
    name: 'Toast',
    description:
      'Stacks notifications in a live region, pauses its timer while hovered or focused, and closes on Escape, a swipe or its own duration.',
    packageName: '@ui-sdk/solid/toast',
    Demo: ToastDemo,
  },
  {
    slug: 'toggle',
    name: 'Toggle',
    description:
      'Keeps a button pressed or coordinates single and multi-select toggle groups with arrow-key navigation.',
    packageName: '@ui-sdk/solid/toggle',
    Demo: ToggleDemo,
  },
  {
    slug: 'token-input',
    name: 'Token Input',
    description:
      'Mixes free text with removable inline tokens for tags, recipients, or references with keyboard selection and deletion.',
    packageName: '@ui-sdk/solid/token-input',
    Demo: TokenInputDemo,
  },
  {
    slug: 'toolbar',
    name: 'Toolbar',
    description:
      'Groups buttons, toggles, inputs, menus, and separators under a single roving tab stop.',
    packageName: '@ui-sdk/solid/toolbar',
    Demo: ToolbarDemo,
  },
  {
    slug: 'tooltip',
    name: 'Tooltip',
    description:
      'Names or describes its trigger on hover and keyboard focus, flips to another side when there is no room, and closes on Escape without moving focus.',
    packageName: '@ui-sdk/solid/tooltip',
    Demo: TooltipDemo,
  },
  {
    slug: 'tree',
    name: 'Tree',
    description:
      'Navigates nested file hierarchies and expandable branches with arrow keys, typeahead, and single or tri-state selection.',
    packageName: '@ui-sdk/solid/tree',
    Demo: TreeDemo,
  },
  {
    slug: 'trigger-menu',
    name: 'Trigger Menu',
    description:
      'Opens caret-anchored suggestions when typing trigger characters like @, /, or # inside an input or textarea.',
    packageName: '@ui-sdk/solid/trigger-menu',
    Demo: TriggerMenuDemo,
  },
  {
    slug: 'waterfall',
    name: 'Waterfall',
    description:
      'Visualizes request traces and nested spans along a shared millisecond time axis with expandable rows and milestones.',
    packageName: '@ui-sdk/solid/waterfall',
    Demo: WaterfallDemo,
  },
]

export const componentBySlug = new Map(
  componentCatalog.map((entry, index) => [entry.slug, { entry, index }]),
)
