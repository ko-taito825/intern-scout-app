class Api::JobsController < ApplicationController
  before_action :set_job, only: [:show, :update]
  def index
    jobs = Job.includes(:company_profile).order(created_at: :desc)
    render json: jobs, include: :company_profile
  end

  def show
    render json: @job, include: :company_profile
  end
  def create
    job = Job.new(job_params)

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
    if @job.update(job_params)
      render json: @job
    else
      render json: { 
        error: "募集の更新に失敗しました", 
        messages: @job.errors.full_messages 
      }, status: :unprocessable_entity
    end
  end
  private
  def job_params
    params.permit(:company_profile_id, :title, :content, :requirements, :work_style)
  end
  def set_job
    @job = Job.find(params[:id])
  rescue ActiveRecord::RecordNotFound
      render json: { error: "指定された募集が見つかりません" }, status: :not_found
  end
end
