class Api::V1::ProfilesController < Api::V1::ApplicationController
  skip_before_action :auth_user!, only: [:create, :reset_password, :change_password]

  def show
    render json: current_user, serializer: ProfileSerializer
  end

  def create
    result = UserServices::Create.call(params: profile_params)
    if result.failure?
      return render json: { errors: result.user.errors }, status: 422
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
    result = UserServices::Update.call(user: current_user, params: profile_update_params)
    if result.failure?
      return render json: { errors: result.user.errors }, status: 422
    end
    render json: ProfileSerializer.new(result.user).as_json
  end

  def destroy
    current_user.destroy
    head :ok
  end

  private

  def profile_params
    params.require(:profile).permit(:email, :password)
  end

  def profile_update_params
    params.require(:profile).permit(:password)
  end
end