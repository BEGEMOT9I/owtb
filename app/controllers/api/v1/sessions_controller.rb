class Api::V1::SessionsController < Api::V1::ApplicationController
  skip_before_action :auth_user!, only: [:create, :update]

  def create
    result = SessionServices::SignIn.call(params: session_params)
    if result.failure?
      return render json: { error: 'Forbidden' }, status: 403
    end
    access_token = SessionServices::Create.call(user: result.user).session
    render json: {
      session: {
        access_token: access_token.id,
        refresh_token: access_token.refresh_token,
        expire_at: access_token.expire_at&.to_f
      },
      profile: ProfileSerializer.new(result.user).as_json
    }, status: 201
  end

  def update
    result = SessionServices::Update.call(refresh_token: params[:refresh_token])
    if result.failure?
      return render json: { error: 'Forbidden' }, status: 403
    end
    render json: {
      session: {
        access_token: result.session.id,
        refresh_token: result.session.refresh_token,
        expire_at: result.session.expire_at&.to_f
      },
      profile: ProfileSerializer.new(result.session.user).as_json
    }, status: 201
  end

  def destroy
    current_session.destroy
    head :ok
  end

  def session_params
    params.require(:session).permit(:email, :password)
  end
end