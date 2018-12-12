class UserServices::UpdateForm
  attr_reader :record
  attr_reader :params

  ValidationsSchema = Dry::Validation.Schema do
    configure do
      option :record
      config.messages = :i18n

    end
    required(:password).filled(min_size?: 6)
  end

  def initialize(record:, params:)
    @record, @params = record, params.to_h.symbolize_keys
    prepopulate!
  end

  def valid?
    @errors = ValidationsSchema.with(record: @record).call(@params)
    @errors.errors.blank?
  end

  def result
    set_params
    @errors.errors.each{|k, v| @record.errors.add(k, v.first)} if !valid?
    @record
  end

  def set_params
    @record.attributes = @params
    @record
  end

  def prepopulate!
    @params[:email]&.downcase!
  end
end