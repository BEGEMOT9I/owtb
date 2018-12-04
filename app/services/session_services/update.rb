class SessionServices::Update

  include Interactor

  def call
    Session.transaction do
      SessionServices::Destroy.call(session: context.session)
      context.session = SessionServices::Create.call(user: context.session.user)
    end
  end
end