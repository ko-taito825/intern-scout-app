class Api::InternProfilesController < ApplicationController
  def index
    intern_profiles = InternProfile.all
    # 後で簡易ログイン実装時に動的なIDに変更する
    current_company_user_id = 1
    scouted_intern_user_ids = Scout.where(company_user_id: current_company_user_id).pluck(:intern_user_id)

    result = intern_profiles.map do |profile|
      profile.as_json.merge(scouted: scouted_intern_user_ids.include?(profile.user_id))
    end
    render json: result
  end

  def show
    intern_profile = InternProfile.find(params[:id])
    # 後で簡易ログイン実装時に動的なIDに変更する
    current_company_user_id = 1
    is_scouted = Scout.exists?(
      company_user_id: current_company_user_id,
      intern_user_id: intern_profile.user_id
    )
    render json: intern_profile.as_json.merge(scouted: is_scouted)
  end

  def create
    user = User.create(role: "intern")

    intern_profile = user.build_intern_profile(
      name: params[:name],
      university: params[:university],
      grade: params[:grade],
      bio: params[:bio],
      github_url: params[:github_url],
      portfolio_url: params[:portfolio_url]
    )
    if intern_profile.save
      render json: intern_profile, status: :created
    else
      render json: { error: "インターン生の登録に失敗しました", messages: intern_profile.errors.full_messages }, status: :unprocessable_entity
    end
  end
  def update
        # ログイン中（と仮定している）ユーザーのプロフィールを探す
        profile = InternProfile.find_by(user_id: 2)
        if profile.update(intern_profile_params)
          render json: profile
        else
          render json: { error: "プロフィールの更新に失敗しました", messages: profile.errors.full_messages }, status: :unprocessable_entity
        end
  end

  def me
    #簡易ログイン中のインターン生(id:2)のプロフィールを探す
    profile = InternProfile.find_by(user_id: 2)

    if profile
        render json: profile
    else
        render json: { error: "プロフィール未登録です" }, status: :not_found 
    end
  end

  private

    def intern_profile_params
      params.require(:intern_profile).permit(:name, :university, :grade, :bio, :github_url, :portfolio_url)
    end
end
