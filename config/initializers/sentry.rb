
if ENV['SENTRY_DSN'].present?
  Raven.configure do |config|
    config.dsn = ENV['SENTRY_DSN']
    config.environments = ['production', 'staging']
    config.open_timeout = 10
    config.timeout = 10
  end
end
