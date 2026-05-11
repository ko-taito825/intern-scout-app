class Api::CompanyProfilesController < ApplicationController

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
end
