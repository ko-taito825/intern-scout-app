class Api::ScoutsController < ApplicationController
  def create
    scout = Scout.create!(
      company_user_id: params[:company_user_id],
      intern_user_id: params[:intern_user_id],
      status: "pending"
    )
    render json: scout, status: :created
  end
end
