class UserServices::Form
  attr_reader :record
  attr_reader :params

  ValidationsSchema = Dry::Validation.Schema do
    configure do
      option :record
      config.messages = :i18n
      def check_email?(attr_name, value)
        record.class.where.not(id: record.id).where(attr_name => value).empty?
      end
    end
    required(:email).filled(check_email?: :email, format?: /\A[\+A-Z0-9\._%-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}\z/i)
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