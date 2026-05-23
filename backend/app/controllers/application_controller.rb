class ApplicationController < ActionController::API
  private
  def current_user_id
    request.headers["X-User-Id"]
  end
end
