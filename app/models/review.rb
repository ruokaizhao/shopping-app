class Review < ApplicationRecord
  belongs_to :user
  belongs_to :product
  validates :content, presence: true, length: { maximum: 10 }
  validates :rating, presence: true
end
