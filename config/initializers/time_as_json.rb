class ActiveSupport::TimeWithZone
  def as_json(options = {})
    to_f
  end
end