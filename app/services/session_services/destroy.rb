class SessionServices::Destroy

  include Interactor

  def call
    context.session.destroy
  end
end