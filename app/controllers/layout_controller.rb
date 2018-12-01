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
end