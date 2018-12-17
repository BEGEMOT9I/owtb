import React, { Component, Fragment } from 'react'
import { Form, Field } from 'react-final-form'
import { observer, inject } from 'mobx-react'
import injectStyles, { JSSProps } from 'react-jss'
import { compose } from 'recompose'
import { hot } from 'react-hot-loader'

import { UserStore } from 'lib/store/modules/user'
import AppHelmet from 'components/AppHelmet'
import TextInput from 'components/FormFields/components/TextInput'
import Button from 'components/Button'
import LoadingOverlay from 'components/LoadingOverlay'
import { email } from 'lib/utils/validations'
import styles from './styles'

interface FormValues {
  email: string
  password: string
  passwordRepeated: string
}
interface OuterProps extends App.RouteProps {}
interface Props extends OuterProps, JSSProps<typeof styles> {
  userStore: UserStore
}
interface State {}

@inject('userStore')
@observer
class Registration extends Component<Props, State> {
  onSubmit = ({ email, password }: FormValues) => {
    this.props.userStore.registration(email, password)
  }

  render() {
    const { classes } = this.props

    return (
      <Fragment>
        <AppHelmet title="Регистрация" />
        <section className={classes.container}>
          <h1 className="visuallyHidden">Страница регистрации</h1>
          <Form
            onSubmit={this.onSubmit}
            render={({ handleSubmit, pristine, invalid }) => (
              <section className={classes.formWrapper}>
                <h2 className={classes.title}>Регистрация</h2>
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
                  <Field
                    className={classes.field}
                    name="passwordRepeated"
                    placeholder="Повторите пароль"
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
                    Зарегистрироваться
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
)(Registration)
