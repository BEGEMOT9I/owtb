export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type BreakpointValues = { [key in Breakpoint]: number }

const keys: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl']
const values: BreakpointValues = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920
}

const unit = 'px'
const step = 5

function up(key: Breakpoint | number) {
  const value = typeof values[key] === 'number' ? values[key] : key
  return `@media (min-width:${value}${unit})`
}

function down(key: Breakpoint | number) {
  const endIndex = typeof key !== 'number' ? keys.indexOf(key) + 1 : 0
  const upperbound = values[keys[endIndex]]

  if (endIndex === keys.length) {
    return up('xs')
  }

  const value = typeof upperbound === 'number' && endIndex > 0 ? upperbound : key
  return `@media (max-width:${+value - step / 100}${unit})`
}

function between(start: Breakpoint, end: Breakpoint) {
  const endIndex = keys.indexOf(end) + 1

  if (endIndex === keys.length) {
    return up(start)
  }

  return (
    `@media (min-width:${values[start]}${unit}) and ` +
    `(max-width:${values[keys[endIndex]] - step / 100}${unit})`
  )
}

function only(key: Breakpoint) {
  return between(key, key)
}

function width(key: Breakpoint) {
  return values[key]
}

const breakpoints = {
  keys,
  values,
  unit,
  step,
  up,
  down,
  between,
  only,
  width
}

export default breakpoints
