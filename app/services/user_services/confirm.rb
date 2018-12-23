class UserServices::Confirm

  include Interactor

  def call
    if context.user.confirmation_token == context.confirmation_token
      if context.user.confirmed_at
        context.error = { base: ['Адрес электронной почты уже подтвержден'] }
        context.fail!
      else
        context.user.update(confirmed_at: Time.now)
      end
    else
      context.error = { base: ['Не верный токен подтверждения электронной почты'] }
      context.fail!
    end
  end
end