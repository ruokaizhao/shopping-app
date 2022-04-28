class User < ApplicationRecord
  has_secure_password
  has_many :carts
  has_many :reviews
  has_many :products, through: :reviews
  has_one :address
  has_many :orders
  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :name, presence: true, length: {maximum: 254}
  validates :password, presence: true, length: {minimum: 6}
end
