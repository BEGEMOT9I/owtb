class UserServices::Create

  include Interactor

  def call
    form = UserServices::Form.new(record: User.new, params: context.params)
    context.user = form.result
    context.user.confirmation_token = SecureRandom.uuid
    context.user.confirmed_at = Time.now
    context.fail! if context.user.errors.present?
    context.user.save
    # UserMailer.with(user: context.user).send_confirmation().deliver_now
  end
end