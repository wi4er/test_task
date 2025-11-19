class OrdersController < ApplicationController
  def index
    render json: {
      status: true,
      data: Order.all
    }
  end
end
