import React, { Component, Fragment } from 'react'
import { Form, Field } from 'react-final-form'
import { observer, inject } from 'mobx-react'
import injectStyles, { JSSProps } from 'react-jss'
import { compose } from 'recompose'
import { hot } from 'react-hot-loader'
import isEmpty from 'lodash/isEmpty'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import { UserStore } from 'lib/store/modules/user'
import AppHelmet from 'components/AppHelmet'
import FormInput from 'components/FormFields/components/Input'
import ErrorsList from 'components/ErrorsList'
import LoadingOverlay from 'components/LoadingOverlay'
import { email, notEmpty, sameAsOriginal } from 'lib/utils/validations'
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
    const {
      classes,
      userStore: {
        requests: {
          registration: { errors, state }
        },
        isRegistrationSubmitting
      }
    } = this.props

    return (
      <Fragment>
        <AppHelmet title="Регистрация" />
        <section className={classes.container}>
          <h1 className="visuallyHidden">Страница регистрации</h1>
          <Form
            onSubmit={this.onSubmit}
            render={({ handleSubmit, pristine, invalid }) => (
              <Paper className={classes.formWrapper}>
                <Typography variant="h5" component="h2">
                  Регистрация
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                  <Field
                    name="email"
                    label="Email"
                    component={FormInput}
                    validate={email}
                    type="email"
                    autoComplete="email"
                    required
                    controlProps={{
                      className: classes.field
                    }}
                  />
                  <Field
                    name="password"
                    label="Пароль"
                    component={FormInput}
                    validate={notEmpty}
                    type="password"
                    autoComplete="new-password"
                    required
                    controlProps={{
                      className: classes.field
                    }}
                  />
                  <Field
                    name="passwordRepeated"
                    label="Повторите пароль"
                    component={FormInput}
                    validate={sameAsOriginal('password', 'Пароли не совпадают')}
                    type="password"
                    autoComplete="new-password"
                    required
                    controlProps={{
                      className: classes.field
                    }}
                  />
                  <ErrorsList
                    show={!isEmpty(errors) && !isRegistrationSubmitting}
                    errors={errors}
                  />
                  <Button
                    classes={{ root: classes.submitButton }}
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Зарегистрироваться
                  </Button>
                  <LoadingOverlay show={isRegistrationSubmitting} />
                </form>
              </Paper>
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