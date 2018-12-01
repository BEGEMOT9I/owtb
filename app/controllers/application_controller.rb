class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found unless Rails.env.development?
  rescue_from ActionController::UnknownFormat, with: :record_not_found unless Rails.env.development?
  rescue_from ActionController::InvalidCrossOriginRequest, with: :csrf_error if !Rails.env.development?

  def record_not_found(error)
    self.response_body = nil
    respond_to do |format|
      format.html { render file: 'public/404.html', status: :not_found, layout: false }
      format.any  { render json: {error: 'Record not found'}, status: :not_found  }
    end
  end

  def routing_error
    self.response_body = nil
    respond_to do |format|
      format.html { render file: 'public/404.html', status: :not_found, layout: false }
      format.any  { render json: {error: 'Routing error'}, status: :not_found  }
    end
  end

  def csrf_error
    if !self.response_body
      respond_to do |format|
        format.any  { render json: {error: 'CSRF Error'}, status: 403  }
      end
    end
  end
end
