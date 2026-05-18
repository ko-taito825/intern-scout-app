class Api::JobsController < ApplicationController
  def index
    jobs = Job.includes(:company_profile).order(created_at: :desc)
    render json: jobs, include: :company_profile
  end

  def show
    job = Job.find(params[:id])
    render json: job, include: :company_profile
  end
  def create
    job = Job.new(job_params)

    if job.save
      render json: job, status: :created
    else
      render json: { errors: job.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private
  
  def job_params
    params.permit(:company_profile_id, :title, :content, :requirements, :work_style)
  end
end