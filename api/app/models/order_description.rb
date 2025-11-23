class OrderDescription < ApplicationRecord
  belongs_to :order
  belongs_to :item
  accepts_nested_attributes_for :item

end
