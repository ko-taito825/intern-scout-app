# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_05_18_044911) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "company_profiles", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.text "description"
    t.string "industry"
    t.string "name"
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.string "website_url"
    t.index ["user_id"], name: "index_company_profiles_on_user_id"
  end

  create_table "entries", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.bigint "job_id", null: false
    t.text "message"
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["job_id"], name: "index_entries_on_job_id"
    t.index ["user_id"], name: "index_entries_on_user_id"
  end

  create_table "intern_profiles", force: :cascade do |t|
    t.text "bio"
    t.datetime "created_at", null: false
    t.string "github_url"
    t.string "grade"
    t.string "name"
    t.string "portfolio_url"
    t.string "university"
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["user_id"], name: "index_intern_profiles_on_user_id"
  end

  create_table "jobs", force: :cascade do |t|
    t.bigint "company_profile_id", null: false
    t.text "content"
    t.datetime "created_at", null: false
    t.text "requirements"
    t.string "title"
    t.datetime "updated_at", null: false
    t.string "work_style"
    t.index ["company_profile_id"], name: "index_jobs_on_company_profile_id"
  end

  create_table "messages", force: :cascade do |t|
    t.text "body"
    t.datetime "created_at", null: false
    t.bigint "scout_id", null: false
    t.datetime "updated_at", null: false
    t.index ["scout_id"], name: "index_messages_on_scout_id"
  end

  create_table "scouts", force: :cascade do |t|
    t.bigint "company_user_id"
    t.datetime "created_at", null: false
    t.bigint "intern_user_id"
    t.string "status"
    t.datetime "updated_at", null: false
    t.index ["company_user_id"], name: "index_scouts_on_company_user_id"
    t.index ["intern_user_id"], name: "index_scouts_on_intern_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "role"
    t.datetime "updated_at", null: false
  end

  add_foreign_key "company_profiles", "users"
  add_foreign_key "entries", "jobs"
  add_foreign_key "entries", "users"
  add_foreign_key "intern_profiles", "users"
  add_foreign_key "jobs", "company_profiles"
  add_foreign_key "messages", "scouts"
  add_foreign_key "scouts", "users", column: "company_user_id"
  add_foreign_key "scouts", "users", column: "intern_user_id"
end
