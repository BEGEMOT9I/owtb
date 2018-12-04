class Api::V1::ApplicationController < ActionController::Base
  serialization_scope :view_context
  protect_from_forgery with: :null_session # :exception
  skip_before_action :verify_authenticity_token

  if !Rails.env.development?
    rescue_from ActiveRecord::RecordNotFound,                with: :record_not_found
    rescue_from ActionController::UnknownFormat,             with: :record_not_found
    rescue_from ActionController::InvalidCrossOriginRequest, with: :csrf_error
  end

  before_action :auth_user!


  def current_user
    @current_user ||= User.joins(:sessions).where(sessions: { id: request.headers['X-User-Token'] }).first
  end

  def current_session
    @current_session ||= Session.where(id: request.headers['X-User-Token']).first
  end

  def auth_user!
    render json: { error: 'Unauthorized' }, status: 401 if !current_user
  end

  def record_not_found(error=nil)
    self.response_body = nil
    render json: { error: 'Record not found' }, status: :not_found
  end

  def routing_error
    self.response_body = nil
    render json: { error: 'Routing error' }, status: :not_found
  end

  def csrf_error
    if !self.response_body
      render json: { error: 'CSRF Error' }, status: 403
    end
  end
end
