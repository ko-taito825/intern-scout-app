class Api::InternProfilesController < ApplicationController
  def index
    intern_profiles = InternProfile.all
    render json: intern_profiles
  end

  def show
    intern_profile = InternProfile.find(params[:id])
    render json: intern_profile
  end

  def create
    user = User.create!(role: "intern")

    intern_profile = user.create_intern_profile!(
      name: params[:name],
      university: params[:university],
      grade: params[:grade],
      bio: params[:bio],
      github_url: params[:github_url],
      portfolio_url: params[:portfolio_url]
    )
    render json: intern_profile, status: :created
  end
end
