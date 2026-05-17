class Api::CompanyProfilesController < ApplicationController
  before_action :set_company_profile, only: [:show, :update]
  def create
    user = User.create!(role: "company")

    company_profile = user.create_company_profile!(
      name: params[:name],
      industry: params[:industry],
      description: params[:description],
      website_url: params[:website_url]
    )
    render json: company_profile, status: :created
  end
  def index
    companies = CompanyProfile.order(created_at: :desc)
    render json: companies
  end

  def show
    company_profile = CompanyProfile.find(params[:id])
    render json: company_profile
  end

  def update
    company_profile = CompanyProfile.find(params[:id])
    if company_profile.update(
      name: params[:name],
      industry: params[:industry],
      description: params[:description],
      website_url: params[:website_url]
    )
    render json: company_profile
    else
      render json:{ errors:company_profile.errors.full_messages }, status: :unprocessable_entity
    end
  end
end
