class ApplicationController < ActionController::API
  private

  def current_user_id
    request.headers["X-User-Id"]
  end

  def require_company_profile!
    profile = CompanyProfile.find_by(user_id: current_user_id)
    if profile.nil? || profile.name.blank?
      render json: { error: "企業プロフィール（企業名）を登録してから操作してください" }, status: :forbidden
    end
  end
end
