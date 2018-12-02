require 'net/http'

class LayoutController < ApplicationController 
  layout 'client'
  def isHMR
    ENV['RAILS_HMR'].present?
  end

  def isSSR
    ENV['RAILS_SSR'].present?
  end

  def index
    render 'shared/body', locals: { state: {}, isHMR: isHMR, isSSR: isSSR } 
  end

  def search
    result = Net::HTTP.get(URI.parse("https://playoverwatch.com/en-us/search/account-by-name/#{URI.encode(params[:query])}"))
    render json: result
  end
end