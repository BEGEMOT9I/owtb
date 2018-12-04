FactoryBot.define do
  factory :user do
    email { "MyString" }
    password_digest { "MyString" }
    confirmation_token { "MyString" }
    confirmed_at { "2018-12-03 20:36:39" }
    recover_token { "MyString" }
    recovered_at { "2018-12-03 20:36:39" }
    deleted_at { "" }
  end
end
