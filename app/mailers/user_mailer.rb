class UserMailer < ApplicationMailer
  before_action { @user = params[:user] }
  default to: -> { @user.email }

  def send_confirmation
    mail(subject: 'Подтверждение учетной записи')
  end
end