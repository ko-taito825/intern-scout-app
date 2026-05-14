class Api::ScoutsController < ApplicationController
  def create
    scout = Scout.create!(
      company_user_id: params[:company_user_id],
      intern_user_id: params[:intern_user_id],
      status: "pending"
    )
    if scout.save
       render json: scout, status: :created
    else
      render json: {error: "すでにスカウト済みです", status: :unprocessable_entity}
    end
   
  end

  def index
    scouts = Scout.where(company_user_id: params[:company_user_id])
    render json: scouts
  end
end
