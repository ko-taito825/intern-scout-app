require "rails_helper"

RSpec.describe "Jobs API", type: :request do
  describe "GET /api/jobs" do
    it "求人一覧を取得できること" do
      get "/api/jobs"
      expect(response).to have_http_status(:ok)
    end
  end
end