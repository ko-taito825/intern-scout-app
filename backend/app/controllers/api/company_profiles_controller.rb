class Api::CompanyProfilesController < ApplicationController
  before_action :set_company_profile, only: [ :show, :update ]

  def index
    companies = CompanyProfile.order(created_at: :desc)
    render json: companies
  end

  def show
    render json: @company_profile
  end

  def create
      user = User.create!(role: "company")
      company_profile = user.build_company_profile(company_profile_params)
      if company_profile.save
        render json: company_profile, status: :created
      else
        render json: { error: "企業の登録に失敗しました", messages: company_profile.errors.full_messages }, status: :unprocessable_entity
      end
  end

  def update
    if @company_profile.update(company_profile_params)
      render json: @company_profile
    else
      render json: { error: "企業情報の更新に失敗しました", messages: @company_profile.errors.full_messages }, status: :unprocessable_entity
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
