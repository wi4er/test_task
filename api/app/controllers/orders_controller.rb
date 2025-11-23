class OrdersController < ApplicationController
  before_action :require_admin!, only: [:index]
  skip_before_action :verify_authenticity_token

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
    }, include: :order_description, OrderDescription:item
  end

  def create
    @order = Order.new(
      user_id: current_user.id,
      amount: 1000,
      order_description: params[:items].map { |it|
        OrderDescription.new(
          item_id: it[:item],
          quantity: it[:quantity]
        )
      }
    )

    if @order.save
      render json: {
        status: true,
        data: @order
      }, include: :order_description
    else
      render json: {
        status: false,
        error: @order.errors
      }, status: :forbidden
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
