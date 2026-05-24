class Api::MessagesController < ApplicationController
  before_action :set_scout
  def index
    messages = @scout.messages.order(created_at: :asc)
    user_id = request.headers["X-User-Id"]
    current_user_id = User.find_by(id: user_id)
    if current_user_id&.role == "company"
      messages.where(is_from_company: false, is_read: false).update_all(is_read: true)
    elsif current_user_id&.role == "intern"
      messages.where(is_from_company: true, is_read: false).update_all(is_read: true)
    end
    render json: messages
  end

  def create
    is_company =  CompanyProfile.exists?(user_id: current_user_id)
    message = @scout.messages.build(body: params[:body], is_from_company: is_company)

    if message.save
      render json: message, status: :created
    else
      render json: {
        error: "メッセージの送信に失敗しました",
        messages: message.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  private

  def set_scout
    @scout = Scout.find(params[:scout_id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "指定されたやり取りが見つかりません" }, status: :not_found
  end

  def message_params
    params.permit(:body)
  end
end
