class ApidocController < ApplicationController

  def index
    `yarn swagger-cli bundle -o public/api-doc.json doc/api.yml` if Rails.env.development?
    render 'layouts/apidoc', layout: false
  end
end