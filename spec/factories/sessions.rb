FactoryBot.define do
  factory :session do
    user { nil }
    refresh_token { "MyString" }
  end
end
