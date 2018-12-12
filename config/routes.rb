Rails.application.routes.draw do
  root 'layout#index'
  get '/api/docs' => 'apidoc#index'
  get '/api/search' => 'layout#search'

  namespace :api do
    namespace :v1 do
      resource :session, only: [:create, :update, :destroy]
      resource :profile, only: [:show, :create, :destroy]
    end
  end

  get '/*frontend_path' => 'layout#index'
end
