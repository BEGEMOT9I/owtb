import { Props } from './index'

const KEYFRAME_ID = 'rotateLoader'
const BASE_SIZE = 64

const styles = (theme: App.Theme) => ({
  [`@keyframes ${KEYFRAME_ID}`]: {
    '0%': {
      transform: 'rotate(0deg)'
    },
    '50%': {
      transform: 'rotate(180deg)'
    },
    '100%': {
      transform: 'rotate(360deg)'
    }
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: '1 0 100%',
    width: '100%',
    height: '100%'
  },
  loading: {
    fontSize: ({ size }: Props) => size || BASE_SIZE,
    height: '1em',
    width: '1em',
    transform: 'translateZ(0)',
    textIndent: '-9999rem',
    backgroundColor: (props: Props) => props.background || 'transparent',
    borderRadius: '100%',
    borderWidth: (props: Props) => (props.size ? '0.1em' : 6),
    borderColor: (props: Props) => props.color || theme.palette.primary.main,
    border: 'solid',
    borderBottomColor: 'transparent !important',
    borderLeftColor: 'transparent !important',
    animation: `${KEYFRAME_ID} 0.8s infinite linear`,
    alignSelf: 'center'
  }
})

export { BASE_SIZE, styles as default }
