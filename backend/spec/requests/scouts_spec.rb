require "rails_helper"

# frozen_string_literal: true

RSpec.describe "Scouts API", type: :request do
  before do
    host! "localhost"
  end
  describe "POST /api/scouts" do
    let(:company_user) { User.create!(role: "company") }
    let(:intern_user)  { User.create!(role: "intern") }
    it " スカウトが送信できること" do
      post "/api/scouts", params: { intern_user_id: intern_user.id }, headers: { "X-User-Id" => company_user.id }
      expect(response).to have_http_status(:created)
      expect(Scout.count).to eq(1)
    end
    it "同じ学生に複数回スカウトできないこと" do
      Scout.create!(company_user_id: company_user.id, intern_user_id: intern_user.id, status: "pending")
      post "/api/scouts", params: { intern_user_id: intern_user.id }, headers: { "X-User-Id" => company_user.id }
      expect(response).to have_http_status(:unprocessable_entity)
    end
  end
end

RSpec.describe "Scouts API", type: :request do
  before do
    host! "localhost"
  end
  describe "GET /api/scouts" do
    let(:company_user) { User.create!(role: "company") }
    let(:intern_user)  { User.create!(role: "intern") }
    it "企業が送ったスカウトの一覧が取得できること" do
      Scout.create!(company_user_id: company_user.id, intern_user_id: intern_user.id, status: "pending")
      get "/api/scouts", headers: { "X-User-Id" => intern_user.id }
      puts response.body
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body).size).to eq(1)
    end
  end
end