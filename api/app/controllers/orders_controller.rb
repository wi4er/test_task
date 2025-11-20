class OrdersController < ApplicationController
  before_action :require_admin!, only: [:index]

  def index
    render json: {
      status: true,
      data: Order.all
    }, include: :order_description
  end

  def mine
    render json: {
      status: true,
      data: Order.where(user_id: current_user.id)
    }, include: :order_description
  end

  def create
    @order = Order.new(
      user_id: current_user.id,
      amount: params[:amount]
    )

    if @order.save
      render json: {
        status: true,
        data: @order
      }, include: :order_description
    end
  end

  def require_admin!
    unless current_user&.role === "admin"
      render json: {
        status: false,
        error: "Not allowed"
      }, status: :forbidden
    end
  end
end
