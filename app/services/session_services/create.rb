class SessionServices::Create

  include Interactor

  def call
    context.session = context.user.sessions.create(refresh_token: SecureRandom.uuid, expire_at: 1.week.from_now)
  end
end