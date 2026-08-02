class Api::EntriesController < ApplicationController
  def index
    company_profile = CompanyProfile.find_by(user_id: current_user_id)

    if company_profile.nil?
      render json: {error: "企業プロフィールが見つかりません"}, status: :not_found
      return
    end

    entries = Entry.includes(:job, entry_messages: [], user: :intern_profile)
      .where(job_id: company_profile.jobs.pluck(:id))
      .order(created_at: :desc)

    result = entries.map do |entry|
      {
        id: entry.id,
        message: entry.message,
        created_at: entry.created_at,
        job_title: entry.job.title,
        applicant_name: entry.user.intern_display_name,
        applicant_id: entry.user.intern_profile&.id,
        has_unread: entry.unread_for?("company")
      }
    end
    render json: result
  end

  def show
    entry = Entry.find(params[:id])
    user_id = request.headers["X-User-Id"]
    current_user = User.find_by(id: user_id)
    name = if current_user&.role == "company"
      entry.user.intern_display_name
    else
      entry.job.company_display_name
    end
    render json: {partner_name: name}
  end

  def create
    entry = Entry.new(entry_params)

    if entry.save
      render json: entry, status: :created
    else
      render json: {error: "応募に失敗しました", messages: entry.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def me
    entries = Entry.includes(job: :company_profile, entry_messages: [])
      .where(user_id: current_user_id)
      .order(created_at: :desc)

    result = entries.map do |entry|
      {
        id: entry.id,
        message: entry.message,
        created_at: entry.created_at,
        job_title: entry.job.title,
        company_name: entry.job.company_display_name,
        has_unread: entry.unread_for?("intern")
      }
    end

    render json: result
  end

  private

  def entry_params
    params.permit(:message).merge(job_id: params[:job_id], user_id: current_user_id)
  end
end
