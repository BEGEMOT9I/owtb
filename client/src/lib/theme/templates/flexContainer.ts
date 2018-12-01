export type FlexDirectionOptions = 'row' | 'row-reverse' | 'column' | 'column-reverse'
export type FlexJustifyContentOptions =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
export type FlexAlignItemsOptions = 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
export type FlexWrapOptions = 'nowrap' | 'wrap' | 'wrap-reverse'

export interface FlexContainerTemplateOpts {
  direction?: FlexDirectionOptions
  justify?: FlexJustifyContentOptions
  alignItems?: FlexAlignItemsOptions
  wrap?: FlexWrapOptions
}

/**
 * @default direction = 'column'
 * @default justify = 'flex-start
 * @default alignItems = 'flex-start'
 * @default wrap = 'nowrap'
 */
function flexContainer(
  options: FlexContainerTemplateOpts
): {
  display: 'flex'
  flexDirection: FlexDirectionOptions
  flexWrap: FlexWrapOptions
  justifyContent: FlexJustifyContentOptions
  alignItems: FlexAlignItemsOptions
}
function flexContainer({
  direction = 'column',
  justify = 'flex-start',
  alignItems = 'flex-start',
  wrap = 'nowrap'
}) {
  return {
    display: 'flex',
    flexDirection: direction,
    flexWrap: wrap,
    justifyContent: justify,
    alignItems
  }
}

export { flexContainer }
