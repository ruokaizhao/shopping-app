class AddressSerializer < ActiveModel::Serializer
  attributes :id, :fullname, :street, :city, :state, :zipcode
end
