class Address < ApplicationRecord
  belongs_to :user
  validates :fullname, presence: true
  validates :street, presence: true
  validates :city, presence: true
  validates :state, presence: true
  validates :zipcode, presence: true
end
