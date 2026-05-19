class Api::ScoutsController < ApplicationController
  def create
    scout = Scout.new(
      company_user_id: params[:company_user_id],
      intern_user_id: params[:intern_user_id],
      status: "pending"
    )
    if scout.save
       render json: scout, status: :created
    else
      render json: { error: "すでにスカウト済みです" }, status: :unprocessable_entity
    end
  end

  def index
    current_intern_user_id = 2

    scout = Scout.includes(company_user: :company_profile, messages: []).where(intern_user_id: current_intern_user_id)

    result = scout.map do |scout|
      {
        id: scout.id,
        status: scout.status,
        company_name: scout.company_user.company_profile.name,
        latest_message: scout.messages.last&.body,
        created_at:scout.created_at,
        intern_user_id: scout.intern_user_id
      }
    end
    render json: result
  end

  def sent
    scouts = Scout.includes(:intern_profile).where(company_user_id: 1).order(created_at: :desc)
    result = scouts.map do |scout|
      {
        id: scout.id,
        status: scout.status,
        created_at: scout.created_at,
        intern_name: scout.intern_user&.intern_profile&.name || "名前未設定",
      }
    end
    render json: result
  end
end
