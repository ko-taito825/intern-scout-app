class Api::EntriesController < ApplicationController
  def create
    entry = Entry.new(entry_params)

    if entry.save
      render json: entry, status: :created
    else
      render json: { errors: entry.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def entry_params
    params.permit(:job_id, :user_id, :message)
  end
  
end