class ProfileSerializer < ActiveModel::Serializer
  attributes :id, :email, :created_at

end