class Api::JobsController < ApplicationController
  def index
    jobs = Job.includes(:company_profile).order(created_at: :desc)
    render json: jobs, include: :company_profile
  end

  def show
    job = Job.find(params[:id])
    render json: job, include: :company_profile
  end
end