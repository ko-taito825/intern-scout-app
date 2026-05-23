class Api::EntriesController < ApplicationController
  def index
    company_profile = CompanyProfile.find_by(user_id: current_user_id)

    if company_profile.nil?
      render json: { error: "企業プロフィールが見つかりません" }, status: :not_found
      return
    end

    entries = Entry.includes(:job, user: :intern_profile)
                   .where(job_id: company_profile.jobs.pluck(:id))
                   .order(created_at: :desc)

    result = entries.map do |entry|
      {
        id: entry.id,
        message: entry.message,
        created_at: entry.created_at,
        job_title: entry.job.title,
        applicant_name: entry.user.intern_profile&.name || "名前未設定",
        applicant_id: entry.user.intern_profile&.id
      }
    end

    render json: result
  end
  def create
    entry = Entry.new(entry_params)

    if entry.save
      render json: entry, status: :created
    else
      render json: { error: "応募に失敗しました", messages: entry.errors.full_messages }, status: :unprocessable_entity
    end
  end
  def me
    entries = Entry.where(user_id: current_user_id)
    render json: entries
  end

  private

  def entry_params
    params.permit(:message).merge(job_id: params[:job_id], user_id: current_user_id)
  end
end
