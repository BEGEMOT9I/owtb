class SessionServices::SignIn
  include Interactor

  def call
    context.user = User.find_by_email(context.params[:email])
    if context.user&.authenticate(context.params[:password])
      context.session = SessionServices::Create.call(user: context.user).session
    else
      context.fail!
    end
  end
end