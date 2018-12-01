Rails.application.routes.draw do
  root 'layout#index'
  get '/api/docs' => 'apidoc#index'
  get '/*frontend_path' => 'layout#index'
end
