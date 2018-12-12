class SessionServices::Update

  include Interactor

  def call
    Session.transaction do
      if old_session = Session.find_by(refresh_token: context.refresh_token)
        context.session = SessionServices::Create.call(user: old_session.user)
        SessionServices::Destroy.call(session: old_session)
      else
        context.fail!
      end
    end
  end
end