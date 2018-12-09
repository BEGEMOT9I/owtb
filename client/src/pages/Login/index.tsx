import React, { PureComponent, Fragment } from 'react'
import { Form, Field } from 'react-final-form'
import injectStyles, { JSSProps } from 'react-jss'
import { compose } from 'recompose'
import { hot } from 'react-hot-loader'

import AppHelmet from 'components/AppHelmet'
import TextInput from 'components/FormFields/components/TextInput'
import Button from 'components/Button'
import LoadingOverlay from 'components/LoadingOverlay'
import { email } from 'lib/utils/validations'
import styles from './styles'

interface OuterProps extends App.RouteProps {}
interface Props extends OuterProps, JSSProps<typeof styles> {}
interface State {}

class IndexPage extends PureComponent<Props, State> {
  onSubmit = () => {}
  render() {
    const { classes } = this.props

    return (
      <Fragment>
        <AppHelmet title="Авторизация" />
        <section className={classes.container}>
          <h1 className="visuallyHidden">Страница логина</h1>
          <Form
            onSubmit={this.onSubmit}
            render={({ handleSubmit, pristine, invalid }) => (
              <section className={classes.formWrapper}>
                <h2 className={classes.title}>Авторизация</h2>
                <form className={classes.form} onSubmit={handleSubmit}>
                  <Field
                    className={classes.field}
                    name="email"
                    placeholder="Email"
                    component={TextInput}
                    validate={email}
                    type="email"
                  />
                  <Field
                    className={classes.field}
                    name="password"
                    placeholder="Пароль"
                    component={TextInput}
                    type="password"
                    withoutDelay
                  />
                  {/* {error && !submitting && <div className={classes.errorMsg}>{error}</div>} */}
                  <Button
                    htmlType="submit"
                    // disabled={submitting}
                    type="primary"
                    className={classes.submitButton}
                  >
                    Войти
                  </Button>
                  <LoadingOverlay show={false} />
                </form>
              </section>
            )}
          />
        </section>
      </Fragment>
    )
  }
}

export default compose<Props, OuterProps>(
  hot(module),
  injectStyles(styles)
)(IndexPage)
