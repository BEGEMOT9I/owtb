class UserMailer < ApplicationMailer
  before_action { @user = params[:user] }
  default to: -> { @user.email }

  def send_confirmation(user)
    @user = user
    mail(subject: 'OWTB: Подтверждение учетной записи')
  end
end