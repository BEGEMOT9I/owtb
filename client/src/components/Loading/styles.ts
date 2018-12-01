import { LoadingProps } from './index'

const keyframeId = 'loadSpin'

const styles = {
  [`@keyframes ${keyframeId}`]: {
    '0%': {
      transform: 'rotate(0deg)'
    },
    '100%': {
      transform: 'rotate(360deg)'
    }
  },
  spinner: {
    borderRadius: '50%',
    boxShadow: 'inset 0 0 0 1em',
    color: (props: LoadingProps) => props.color || '#000',
    fontSize: (props: LoadingProps) => props.size || '11px',
    height: '10em',
    margin: (props: LoadingProps) => props.margin || '40px auto',
    position: 'relative',
    textIndent: '-99999em',
    transform: 'translateZ(0)',
    width: '10em',
    '&:before': {
      animation: (props: LoadingProps) =>
        `${keyframeId} ${props.duration || 2}s infinite ease ${props.duration - 0.5 || 2 - 0.5}s`,
      background: (props: LoadingProps) => props.background || '#fff',
      borderRadius: '10.2em 0 0 10.2em',
      content: '""',
      height: '10.2em',
      left: '-0.1em',
      position: 'absolute',
      top: '-0.1em',
      transformOrigin: '5.2em 5.1em',
      width: '5.2em'
    },
    '&:after': {
      animation: (props: LoadingProps) => `${keyframeId} ${props.duration || 2}s infinite ease`,
      background: (props: LoadingProps) => props.background || '#fff',
      borderRadius: '0 10.2em 10.2em 0',
      content: '""',
      height: '10.2em',
      left: '5.1em',
      position: 'absolute',
      top: '-0.1em',
      transformOrigin: '0px 5.1em',
      width: '5.2em'
    }
  }
}

export { styles as default }
