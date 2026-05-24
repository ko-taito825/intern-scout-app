class Api::EntryMessagesController < ApplicationController
  def index
    entry = Entry.find(params[:entry_id])
    messages = entry.entry_messages.order(created_at: :asc)
    user_id = request.headers["X-User-Id"]
    current_user_id = User.find_by(id: user_id)

    if current_user_id&.role == "company"
      messages.where(is_from_company: false, is_read: false).update_all(is_read: true)
    else
      messages.where(is_from_company: true, is_read: false).update_all(is_read: true)
    end
    render json: messages
  end
  def create
    entry = Entry.find(params[:entry_id])
    message = entry.entry_messages.new(message_params)
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

  def message_params
    params.require(:entry_message).permit(:body, :is_from_company)
  end
end