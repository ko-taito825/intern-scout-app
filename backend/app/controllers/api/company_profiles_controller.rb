class Api::CompanyProfilesController < ApplicationController
  before_action :set_company_profile, only: [:show, :update]
  def create
    user = User.create!(role: "company")

    company_profile = user.create_company_profile!(company_profile_params)
    render json: company_profile, status: :created
  end
  def index
    companies = CompanyProfile.order(created_at: :desc)
    render json: companies
  end

  def show
    render json: @company_profile
  end

  def update
    if @company_profile.update(company_profile_params)
    ender json: @company_profile
    else
      render json: { errors: @company_profile.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def set_company_profile
    @company_profile = CompanyProfile.find(params[:id])
  end

  def company_profile_params
    params.permit(:name, :industry, :description, :website_url)
  end
end
