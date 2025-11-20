class Order < ApplicationRecord
  belongs_to :user
  has_many :order_description
  accepts_nested_attributes_for :order_description
end
