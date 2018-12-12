class UserServices::Update

  include Interactor

  def call
    form = UserServices::UpdateForm.new(record: context.user, params: context.params)
    context.user = form.result
    context.user.save
  end
end