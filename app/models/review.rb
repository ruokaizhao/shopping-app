class Review < ApplicationRecord
  belongs_to :user
  belongs_to :product
  validates :content, presence: true, length: { minimum: 10 }
  validates :rating, presence: true
end
