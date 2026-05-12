class Api::MessagesController < ApplicationController
  def index
    scout = Scout.find(params[:scout_id])
    
    messages = scout.messages
    render json: messages
  end

  def create
    scout = Scout.find(params[:scout_id])    
    message = scout.messages.create!(body:params[:body])
    render json: message, status: :created
  end
end
