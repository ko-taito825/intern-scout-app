class Api::ScoutsController < ApplicationController
  def index
    scouts = Scout.includes(company_user: :company_profile, messages: []).where(intern_user_id: current_user_id)

    result = scouts.map do |scout|
      has_unread = scout.messages.any? { |m| m.is_from_company && !m.is_read }
      {
        id: scout.id,
        status: scout.status,
        company_name: scout.company_user.company_profile.name,
        latest_message: scout.messages.last&.body,
        has_unread: has_unread,
        created_at: scout.created_at,
        intern_user_id: scout.intern_user_id
      }
    end
    render json: result
  end
  def show
    scout = Scout.find(params[:id])
    user_id = request.headers["X-User-Id"]
    current_user = User.find_by(id: user_id)
    partner_name =
    if current_user&.role == "company"
     scout.intern_user&.intern_profile&.name || "学生名未設定"
    else
      scout.company_user&.company_profile&.name || "企業名未設定"
    end
    render json: scout.as_json.merge(partner_name: partner_name)
  end

  def create
    scout = Scout.new(scout_params)
    scout.status = "pending"
    if scout.save
       render json: scout, status: :created
    else
      render json: { error: "すでにスカウト済みです", messages: scout.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def sent
    scouts = Scout.includes(:messages, intern_user: :intern_profile).where(company_user_id: current_user_id).order(created_at: :desc)
    result = scouts.map do |scout|
      has_unread = scout.messages.any? { |m| !m.is_from_company && !m.is_read }
      {
        id: scout.id,
        intern_user_id: scout.intern_user_id,
        status: scout.status,
        created_at: scout.created_at,
        intern_name: scout.intern_user&.intern_profile&.name || "名前未設定",
        latest_message: scout.messages.last&.body,
        has_unread: has_unread

      }
    end
    render json: result
  end
  private
  def scout_params
    params.permit(:intern_user_id).merge(company_user_id: current_user_id)
  end
end
