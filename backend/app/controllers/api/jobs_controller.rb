class Api::JobsController < ApplicationController
  before_action :require_company_profile!, only: [ :create, :update, :destroy ]

  def index
    if current_user_id.present?
      company_profile = CompanyProfile.find_by(user_id: current_user_id)
      jobs = company_profile ? company_profile.jobs.includes(:company_profile).order(created_at: :desc) : Job.none
    else
      jobs = Job.includes(:company_profile).order(created_at: :desc)
    end
    render json: jobs, include: :company_profile
  end

  def show
    job = Job.find(params[:id])
    render json: job, include: :company_profile
  rescue ActiveRecord::RecordNotFound
      render json: { error: "指定された募集が見つかりません" }, status: :not_found
  end
  def create
    company_profile = CompanyProfile.find_by(user_id: current_user_id)
    if company_profile.nil?
      render json: { error: "企業プロフィールが見つかりません" }, status: :not_found
      return
    end
    job = company_profile.jobs.new(job_params)
    if job.save
      render json: job, status: :created
    else
     render json: {
        error: "募集の作成に失敗しました",
        messages: job.errors.full_messages
      }, status: :unprocessable_entity
    end
  end
  def update
   company_profile = CompanyProfile.find_by(user_id: current_user_id)
    job = company_profile&.jobs&.find_by(id: params[:id])
    if job.nil?
      render json: { error: "募集が見つかりません" }, status: :not_found
      return
    end
    if job.update(job_params)
      render json: job
    else
      render json: {
        error: "募集の更新に失敗しました",
        messages: job.errors.full_messages
      }, status: :unprocessable_entity
    end
  end
  def destroy
    company_profile = CompanyProfile.find_by(user_id: current_user_id)
    job = company_profile&.jobs&.find_by(id: params[:id])
    if job.nil?
      render json: { error: "募集が見つかりません" }, status: :not_found
      return
    end
    if job.destroy
      render json: { message: "募集を削除しました" }
    else
      render json: {
        error: "募集の削除に失敗しました",
        messages: job.errors.full_messages
      }, status: :unprocessable_entity
    end
  end
  private
  def job_params
    params.permit(:title, :content, :requirements, :work_style)
  end
end
