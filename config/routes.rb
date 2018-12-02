Rails.application.routes.draw do
  root 'layout#index'
  get '/api/docs' => 'apidoc#index'
  get '/api/search' => 'layout#search'
  get '/*frontend_path' => 'layout#index'
end
